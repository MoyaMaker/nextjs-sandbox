import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

export const SelectInputType = ({
  name,
  field,
}: {
  name: string;
  field: ControllerRenderProps<any, string>;
}) => {
  const inputTypes = ["date", "email", "number", "password", "text"];

  return (
    <Select
      name={name}
      defaultValue={field.value}
      onValueChange={field.onChange}
    >
      <SelectTrigger id={name}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>

      <SelectContent>
        {inputTypes.map((type, index) => (
          <SelectItem key={index} value={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
