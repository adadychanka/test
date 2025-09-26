// TODO: Create the TaskCard component
// Requirements:
// - Display task title, description, priority, due date
// - Show completion status
// - Include edit and delete buttons
// - Use proper TypeScript types
// - Apply priority color coding
// - Make it responsive

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button, ButtonProps } from "@/components/ui/button";
import { Priority } from "@/types/Task";
import { Badge, BadgeProps } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";

const PRIORITY_COLOR_MAP: Record<Priority, BadgeProps['variant']> = {
  high: "destructive",
  medium: "default",
  low: "outline",
}

interface TaskCardProps {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: string;
  completed?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onComplete?: (completed: boolean) => void;
}

export const TaskCard = ({ title, description, priority, dueDate, completed, onEdit, onDelete, onComplete }: TaskCardProps) => {
  const priorityVariant: ButtonProps['variant'] = PRIORITY_COLOR_MAP[priority || 'low'];

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{title}</CardTitle>

          <Checkbox checked={completed} onClick={() => onComplete?.(!completed)}/>
        
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <div className="flex flex-col mt-2 gap-2">
          <div>
            <Badge variant={priorityVariant}>{priority}</Badge>
          </div>
          <span className="ml-2">Due date: {dueDate}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" onClick={onEdit}>Edit</Button>
        <Button variant="outline" size="sm" className="ml-2" onClick={onDelete}>Delete</Button>
      </CardFooter>
    </Card>
  );
};