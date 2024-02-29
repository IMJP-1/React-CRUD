import { useForm } from "react-hook-form";
import { departments } from "../assets/data";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { employees } from "../assets/data";
import { addEmployee, updateEmployee } from "@/api";
import { Link, useNavigate } from "react-router-dom";

const schema = yup.object({
  name: yup.string().required(),
  department: yup.string().required(),
});

export default function AddForm({
  data = null,
  onUpdateSuccess,
  modalOpenChange,
}) {
  const form = useForm({ resolver: yupResolver(schema), defaultValues: data });
  const [editMode, setEditMode] = useState(data != null);
  const { toast } = useToast();
  const navigate = useNavigate();
  function onSubmit(formData) {
    try {
      if (editMode) {
        updateEmployee({ ...formData, id: data.id }, data.id);
        modalOpenChange();
        onUpdateSuccess();
      } else {
        addEmployee({
          id: employees[employees.length - 1].id + 1,
          ...formData,
        });
      }
    } catch (ex) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
    toast({
      title: "Saved Successfully..",
      description: !editMode && "Click on button if you want to redirect to List..",
      action: !editMode && (
        <ToastAction altText="Try again" onClick={() => navigate("/")}>
          List
        </ToastAction>
      ),
    });
    form.reset({ name: "", isActive: false, department: "" });
  }

  return (
    <>
      {!editMode && (
        <div className="mb-3 flex justify-center">
          <Button>
            <Link to={`/`}>Employee List</Link>
          </Button>
        </div>
      )}

      <Form {...form}>
        <Card className="w-[350px] flex justify-center align-middle">
          <CardContent>
            <CardHeader>
              <CardTitle>Add New Employee</CardTitle>
            </CardHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2 pb-2">
                    <div className="space-y-1 leading-none">
                      <FormLabel>Currently Active</FormLabel>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button type="submit">Submit</Button>
              </div>              
            </form>
          </CardContent>
        </Card>
      </Form>
    </>
  );
}
