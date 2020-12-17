import { Type } from "class-transformer";
import { Entity, Column } from "../../../core/platform/services/database/services/orm/decorators";
import { ChannelType } from "../types";

@Entity("channel_tab", {
  primaryKey: [["company_id", "workspace_id"], "channel_id", "id"],
  type: "channel_tab",
})
export class ChannelTab {
  // uuid-v4
  @Type(() => String)
  @Column("company_id", "string", { generator: "uuid" })
  company_id: string;

  // "uuid-v4" | "direct"
  @Type(() => String)
  @Column("workspace_id", "string", { generator: "uuid" })
  workspace_id: string | ChannelType.DIRECT;

  // uuid-v4
  @Type(() => String)
  @Column("channel_id", "string", { generator: "uuid" })
  channel_id: string;

  // uuid-v4
  @Type(() => String)
  @Column("id", "string", { generator: "uuid" })
  id: string;

  @Column("name", "string")
  name: string;

  @Column("configuration", "json")
  configuration: string;

  @Column("application_id", "string")
  application_id: string;

  @Column("owner", "string")
  owner: string;

  @Column("col_order", "string")
  order: string;
}

export type ChannelTabPrimaryKey = Pick<
  ChannelTab,
  "company_id" | "workspace_id" | "channel_id" | "id"
>;