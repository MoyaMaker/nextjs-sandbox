"use client";
import { Check } from "lucide-react";
import { useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const options = [
  {
    label: "Option 1",
    value: "1",
  },
  {
    label: "Option 2",
    value: "2",
  },
  {
    label: "Option 3",
    value: "3",
  },
];

export default function Form() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectAll = () => {
    if (selectedOptions.length === options.length) {
      setSelectedOptions([]);

      return;
    }

    setSelectedOptions(options.map((opt) => opt.value));
  };

  const handleSelect = (value: string) => {
    setSelectedOptions((prevValues) => {
      if (prevValues.includes(value)) {
        return prevValues.filter((opt) => opt !== value);
      }

      return [...prevValues, value];
    });
  };

  return (
    <main className="container mx-auto p-4">
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>

        <DialogContent>
          <Popover>
            <PopoverTrigger>Combobox</PopoverTrigger>

            <PopoverContent>
              <Command>
                <CommandInput placeholder="Search" />
                <CommandEmpty>Not found</CommandEmpty>

                <CommandGroup>
                  <CommandItem onSelect={handleSelectAll}>
                    <Check
                      className={cn(
                        "mr-2 h4 w-4",
                        selectedOptions.length === options.length
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    All
                  </CommandItem>
                  {options.map((option, index) => (
                    <CommandItem
                      key={index}
                      value={option.value}
                      onSelect={handleSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h4 w-4",
                          selectedOptions.includes(option.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </DialogContent>
      </Dialog>
    </main>
  );
}
