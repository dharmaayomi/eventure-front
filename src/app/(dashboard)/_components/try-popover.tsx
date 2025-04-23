import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PopoverDemo() {
  const handleSignup = (role: "user" | "organizer") => {
    console.log(`Signing up as ${role}`);
    // You can replace this with a router.push(`/signup/${role}`) or other action
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Sign Up</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="text-lg leading-none font-medium">Sign Up As</h4>
            <p className="text-muted-foreground text-sm">
              Choose your role to get started.
            </p>
          </div>
          <div className="grid gap-2">
            <Button variant="default" onClick={() => handleSignup("user")}>
              User
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleSignup("organizer")}
            >
              Organizer
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
