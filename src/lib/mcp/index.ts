import { defineMcp } from "@lovable.dev/mcp-js";
import listProjects from "./tools/list-projects";
import getProject from "./tools/get-project";
import listTestimonials from "./tools/list-testimonials";
import submitInquiry from "./tools/submit-inquiry";

export default defineMcp({
  name: "where2studios-mcp",
  title: "Where2Studios",
  version: "0.1.0",
  instructions:
    "Tools for Where2Studios, a creative production studio and the Where2Boys creator brand. " +
    "Use `list_projects` and `get_project` to browse the portfolio, `list_testimonials` for client quotes, " +
    "and `submit_inquiry` to send a new partnership or contact request.",
  tools: [listProjects, getProject, listTestimonials, submitInquiry],
});