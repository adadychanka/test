import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Priority } from "@/types/Task";
import { Select } from "./ui/select";
import { SelectTrigger, SelectContent, SelectItem } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { SelectValue } from "@radix-ui/react-select";

// Define TaskFormData type
export interface TaskFormData {
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string;
}

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
}

export const TaskForm = ({ onSubmit }: TaskFormProps) => {
  const [form, setForm] = useState<TaskFormData>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setErrors({ title: "Title is required" });
      return;
    }
    setErrors({});
    onSubmit(form);
    setForm({ title: "", description: "", priority: "medium", dueDate: "" });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                name="title"
                placeholder="Task title..."
                value={form.title}
                onChange={handleChange}
                required
              />
              {errors.title && (
                <span className="text-red-500 text-sm">{errors.title}</span>
              )}
            </div>
            <div>
              <Textarea
                name="description"
                placeholder="Description (optional)"
                className="w-full border rounded p-2"
                value={form.description}
                onChange={handleChange}
                rows={2}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Priority</label>
              <Select name="priority" value={form.priority} onValueChange={(value) => {
                setForm({ ...form, priority: value as Priority })
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Due Date</label>
              <Input
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Add Task</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setForm({ title: "", description: "", priority: "medium", dueDate: "" })
                }
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};