import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "JournalS3Bucket",
  access: (allow) => ({
    "images/{entity_id}/*": [allow.entity('identity').to(["read", "write", "delete"])],
  }),
});