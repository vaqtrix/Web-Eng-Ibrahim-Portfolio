import {
  Award,
  Blocks,
  BrainCircuit,
  Briefcase,
  Building2,
  ChartColumn,
  Cpu,
  Database,
  Download,
  Github,
  GraduationCap,
  Layers,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  Orbit,
  Phone,
  Radio,
  Rocket,
  Satellite,
  School,
  Send,
  ShoppingCart,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/**
 * One place to resolve the icon strings used in `content/`, so content files
 * stay free of component imports.
 */
export const icons = {
  award: Award,
  blocks: Blocks,
  brain: BrainCircuit,
  briefcase: Briefcase,
  building: Building2,
  chart: ChartColumn,
  cpu: Cpu,
  database: Database,
  download: Download,
  github: Github,
  graduation: GraduationCap,
  layers: Layers,
  leaf: Leaf,
  linkedin: Linkedin,
  mail: Mail,
  map: MapPin,
  orbit: Orbit,
  phone: Phone,
  radio: Radio,
  rocket: Rocket,
  satellite: Satellite,
  school: School,
  send: Send,
  cart: ShoppingCart,
  sparkles: Sparkles,
  workflow: Workflow,
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof icons;

export function getIcon(key: IconKey): LucideIcon {
  return icons[key];
}
