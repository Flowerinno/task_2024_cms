"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  CreateTagsSchema,
  createTagsSchema,
} from "utils/validation/feed.schema";

import { createTag } from "utils";
import { useTags } from "store";

export const CreateTagsForm = () => {
  const setTag = useTags((state) => state.setTag);

  const form = useForm<CreateTagsSchema>({
    resolver: zodResolver(createTagsSchema),
    defaultValues: {
      label: "",
      is_active: false,
    },
  });

  const onSubmit = async (data: CreateTagsSchema) => {
    const tag = await createTag(data);

    if (tag?.id) {
      setTag(tag);
      form.reset();
    }
  };

  return (
    <div className="flex-[0.6] flex flex-col items-center justify-start p-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-2 m-0 space-y-8"
        >
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag label (unique identifier)</FormLabel>
                <FormControl>
                  <Input type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <div className="flex flex-row gap-10">
            <Button className="w-full" type="submit">
              Create new tag
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
