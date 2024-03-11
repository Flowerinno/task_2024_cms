import { Draft } from "@prisma/client";

type UserDraft = { User: { email: string; id: string } };
type Tags = { tags: {label: string}[] };
export type DraftResponse = Draft & UserDraft & Tags;
