"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { FlagSubmission } from "./flag-submission";


interface FlagSubmissionPopoverProps {
  trigger?: React.ReactNode;
}
export default function FlagSubmissionPopover({ trigger }: FlagSubmissionPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger || <Button>Submit a Flag</Button>}
      </PopoverTrigger>
      <PopoverContent className="w-[400px]">
        <FlagSubmission className="border-none shadow-none"/>
      </PopoverContent>
    </Popover>
  );
}
