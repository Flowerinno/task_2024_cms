"use client";

import React, { useEffect, useRef, useState } from "react";
import { useNews, useTags } from "store";
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
import { Tag } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createDraft, createPost, getTags } from "utils";
import {
  CreatePostSchema,
  createPostSchema,
} from "utils/validation/feed.schema";
import { SingleTag } from "../tags";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { fileToDataUrl, presignedToDataUrl } from "utils/files";
import { Cross2Icon } from "@radix-ui/react-icons";

export const AddPostForm = () => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { tags, setTags } = useTags((state) => state);
  const { draft, addToDrafts, resetSelectedDraft } = useNews((state) => state);

  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState<Tag[] | []>([]);

  useEffect(() => {
    if (!tags.length) {
      getTags()
        .then((data) => {
          const activeOnly = data.filter((tag) => tag.is_active);
          setTags(activeOnly);
        })
        .catch(() => {
          toast.error("Failed to fetch tags");
        });
    }
  }, []);

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: draft,
  });

  const onSubmit = async (data: CreatePostSchema) => {
    const payload = {
      ...data,
    };

    const res = await createPost(payload);

    if (res && imgRef.current) {
      resetSelectedDraft();
      imgRef.current.src = "";
      form.reset();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const filteredTags = tags.filter((tag) => tag.label.includes(value));
    setSearch(filteredTags);
  };

  const saveAsDraft = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await form.trigger();

    if (draft) {
      const payload = {
        ...form.getValues(),
      };

      const res = await createDraft(payload);

      if (res?.id && imgRef?.current?.src) {
        addToDrafts({ ...res, media: payload.media as string });
        resetSelectedDraft();
        imgRef.current.src = "";
        form.reset();
      }
    }
  };

  form.watch("media");

  useEffect(() => {
    form.setValue("title", draft?.title);
    form.setValue("content", draft?.content);
    form.setValue("link", draft?.link);
    form.setValue("creator", draft?.creator);
    form.setValue("tags", draft?.tags);
    form.setValue("is_active", draft?.is_active);
    form.setValue("pubDate_included", draft?.pubDate_included);
    if (draft?.media) {
      form.setValue("media", draft?.media);
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
          className="w-full md:w-8/12  p-5 m-0 rounded-md space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post content (optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="creator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author (optional)</FormLabel>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post link (optional)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Image
            aria-label="Post image preview"
            alt="Post image preview"
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
                  <FormLabel className="flex flex-row gap-2">Media </FormLabel>
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

          <FormField
            control={form.control}
            name="tags"
            render={({ field: { ref } }) => (
              <FormItem>
                <FormLabel>Resource tags (max 3, add on TAB key)</FormLabel>
                <div className="flex flex-row gap-3">
                  {form.getValues("tags")?.map((item, i) => (
                    <Label
                      className="border-[1px] border-gray-500 p-2 rounded-md cursor-pointer hover:border-red-500"
                      key={i}
                      onClick={() => {
                        form.setValue(
                          "tags",
                          form.getValues("tags").filter((tag) => tag !== item),
                        );
                      }}
                    >
                      #{item}
                    </Label>
                  ))}
                </div>
                <br />
                <FormControl>
                  <Input
                    id="tags_search_field"
                    placeholder="Search tags..."
                    onKeyDown={(e) => {
                      if (e.code === "Tab") {
                        e.preventDefault();
                        const value = e.currentTarget.value;
                        const existingTags = form.getValues("tags");

                        if (
                          value.length > 0 &&
                          value.length < 15 &&
                          existingTags.length < 3 &&
                          !existingTags.includes(value) &&
                          tags.find((tag) => tag.label === value)
                        ) {
                          form.setValue("tags", [
                            ...form.getValues("tags"),
                            value,
                          ]);
                          e.currentTarget.value = "";
                          setIsSearching(false);
                        }
                      }
                    }}
                    ref={ref}
                    onChange={handleSearch}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row flex-wrap gap-2">
            {search.length > 0 &&
              isSearching &&
              search.map((tag) => {
                return (
                  <div
                    key={tag.id}
                    className="w-fit cursor-pointer"
                    onClick={() => {
                      const input = document.getElementById(
                        "tags_search_field",
                      ) as HTMLInputElement;
                      const existingTags = form.getValues("tags");

                      if (
                        existingTags.length < 3 &&
                        !existingTags.includes(tag.label)
                      )
                        form.setValue("tags", [
                          ...form.getValues("tags"),
                          tag.label,
                        ]);
                      setIsSearching(false);
                      input.value = "";
                    }}
                  >
                    <SingleTag key={tag.id} tag={tag} isSearching />
                  </div>
                );
              })}
          </div>

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
          <Controller
            control={form.control}
            name="pubDate_included"
            render={({ field: { onChange, onBlur, value, name } }) => {
              return (
                <FormItem className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    onBlur={onBlur}
                    onChange={onChange}
                    checked={value}
                    name={name}
                    id="pubDate_included"
                    className="accent-black"
                  />

                  <label
                    htmlFor="pubDate_included"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    style={{ padding: 0, margin: 0 }}
                  >
                    Include publication date
                  </label>
                </FormItem>
              );
            }}
          />

          <div className="flex flex-row gap-10">
            <Button className="w-full" type="submit">
              Create new post
            </Button>
            <Button className="w-full" onClick={saveAsDraft}>
              Save as draft
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
