import { LucideIcon } from "lucide-react"; 
import { Button } from "@/components/ui/button";

interface SidebarButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function SidebarButton({ icon: Icon, label, isActive, onClick }: SidebarButtonProps) {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start text-base px-4 py-6"
      onClick={onClick}
    >
      <Icon className="h-5 w-5 mr-3" />
      {label}
    </Button>
  );
}

export default SidebarButton;