"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdvertisementDraft } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { fileToDataUrl, presignedToDataUrl } from "utils/files";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAdStore } from "store/ads/useAdStore";
import { createAdSchema } from "utils/validation/ads.schema";
import { createAd, createAdDraft } from "utils/ads";
import { useRouter } from "next/navigation";
import { getPost } from "utils";
import toast from "react-hot-toast";

export const CreateAdForm = () => {
  const router = useRouter();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [postMessage, setPostMessage] = useState("");
  const { draft, resetSelectedDraft } = useAdStore((state) => state);

  const form = useForm<Partial<AdvertisementDraft>>({
    resolver: zodResolver(createAdSchema),
    defaultValues: draft,
  });

  const onSubmit = async (data: Partial<AdvertisementDraft>) => {
    if (data.post_id && data.post_id !== 0) {
      const post = await getPost(data.post_id);
      if (!post) {
        toast.error(`Post with ID ${data.post_id} not found`);
        return;
      }
    }

    const payload = {
      ...data,
    };

    const res = await createAd(payload);

    if (res?.id) {
      resetSelectedDraft();
      imgRef.current!.src = "";
      form.reset();
    }
  };

  const saveAsDraft = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await form.trigger();

    const payload = {
      ...form.getValues(),
    };

    const res = await createAdDraft(payload);

    if (res?.id && imgRef?.current?.src) {
      resetSelectedDraft();
      imgRef.current.src = "";
      form.reset();
      router.refresh();
    }
  };

  form.watch("media");

  useEffect(() => {
    setPostMessage("");
    form.setValue("title", draft?.title);
    form.setValue("link", draft?.link);
    form.setValue("is_active", draft?.is_active);
    form.setValue("post_id", draft?.post_id ?? 0);

    form.setValue(
      "ad_priority", //@ts-expect-error
      draft?.ad_priority ? draft.ad_priority.toString() : "0",
    );
    if (draft?.media) {
      if (draft.media.startsWith("http")) {
        presignedToDataUrl(draft.media).then((file) => {
          form.setValue("media", file as string);
        });
      } else {
        form.setValue("media", draft?.media);
      }
    }
  }, [draft?.title, draft?.media]);

  const mediaDep = form.getValues("media");

  useEffect(() => {
    if (form?.getValues("media")) {
      const file = form.getValues("media");
      const img = imgRef.current;

      if (file && img) {
        img.src = file;
      }
    }
  }, [mediaDep]);

  return (
    <div className="flex-[0.7] flex flex-col items-center justify-start p-0">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:w-8/12 p-5 m-0 rounded-md space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field: { value, ...rest } }) => (
              <FormItem>
                <FormLabel>Clickable link URL (optional)</FormLabel>
                <FormControl>
                  <Input value={value ?? ""} {...rest} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="post_id"
            render={({ field: { value, onChange, onBlur, ...rest } }) => (
              <FormItem>
                <FormLabel>
                  Insert to a specific post by ID - integer (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    min={0}
                    type="number"
                    value={value ? Number(value) : 0}
                    onBlur={(e) => {
                      try {
                        getPost(Number(e.target.value)).then((post) => {
                          if (post?.id) {
                            setPostMessage(`Post found: ${post.title}`);
                          } else {
                            setPostMessage("Post not found");
                          }
                        });
                      } catch (error) {
                        setPostMessage("Post not found");
                      }
                    }}
                    onChange={(e) => {
                      onChange(Number(e.target.value));
                    }}
                    {...rest}
                  />
                </FormControl>
                {postMessage && <FormLabel>{postMessage}</FormLabel>}
                <FormMessage />
              </FormItem>
            )}
          />

          <Image
            aria-label="Ad media preview"
            alt="Ad media preview"
            ref={imgRef}
            className="w-full h-64 object-contain rounded-lg"
            src={""}
            style={{
              display: form.getValues("media") ? "block" : "none",
            }}
          />

          <div className="relative">
            <FormField
              control={form.control}
              name="media"
              render={({ field: { ref } }) => (
                <FormItem>
                  <FormLabel className="flex flex-row gap-2">
                    Ad Media (optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      accept="image/png"
                      type="file"
                      onChange={async (e) => {
                        if (e?.target?.files) {
                          const file = e?.target?.files[0];
                          form.setValue("media", await fileToDataUrl(file));
                        }
                      }}
                      ref={ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Cross2Icon
              className="absolute right-0 top-0 cursor-pointer"
              aria-label="Remove asset"
              color="red"
              onClick={() => {
                if (imgRef.current) imgRef.current.src = "";
                form.setValue("media", "");
              }}
            />
          </div>
          <div className="flex flex-row gap-6 items-center">
            <Controller
              control={form.control}
              name="is_active"
              render={({ field: { onChange, onBlur, value, name } }) => {
                return (
                  <FormItem className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onBlur={onBlur}
                      onChange={onChange}
                      checked={value}
                      name={name}
                      id="is_admin"
                      className="accent-black"
                    />

                    <label
                      htmlFor="is_admin"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      style={{ padding: 0, margin: 0 }}
                    >
                      Activate on creation
                    </label>
                  </FormItem>
                );
              }}
            />
          </div>
          <FormField
            control={form.control}
            name="ad_priority"
            render={({ field: { value, ...rest } }) => (
              <FormItem>
                <FormLabel htmlFor="ad_priority">
                  Ad priority - <strong>{value}</strong>
                </FormLabel>
                <FormControl>
                  <Input
                    id="ad_priority"
                    aria-label="Advertisement priority"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={value}
                    className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 p-0 m-0"
                    min={0}
                    max={100}
                    step={1}
                    type="range"
                    defaultValue={value ?? "0"}
                    {...rest}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-2">
            <Button className="flex-1" type="submit">
              Create ad
            </Button>
            <Button className="flex-1" onClick={saveAsDraft}>
              Save as draft
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
