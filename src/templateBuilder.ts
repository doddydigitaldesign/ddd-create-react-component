import { Templates as TemplateIdentifiers, templates } from "./templates";

export class TemplateBuilder {
  templateIds: TemplateIdentifiers;
  componentName: string;
  constructor(args: {
    componentName: string;
    templateIds: TemplateIdentifiers;
  }) {
    this.templateIds = args.templateIds;
    this.componentName = args.componentName;
  }

  getTemplates() {
    return this.templateIds.map((id) => templates[id](this.componentName));
  }
}
