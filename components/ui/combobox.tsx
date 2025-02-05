// "use client"

// import * as React from "react"
// import { Check, ChevronsUpDown } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Command as CommandRoot,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Command as CommandPrimitive } from "cmdk"

// export interface ComboboxProps {
//   items: { value: string; label: string }[]
//   value?: string
//   onChange?: (value: string) => void
//   disabled?: boolean
//   placeholder?: string
// }

// const Command = React.forwardRef<
//   HTMLDivElement,
//   React.ComponentProps<typeof CommandPrimitive>
// >(({ className, ...props }, ref) => (
//   <CommandPrimitive
//     ref={ref}
//     className={cn(
//       "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
//       className
//     )}
//     {...props}
//   />
// ))
// Command.displayName = CommandPrimitive.displayName

// export function Combobox({
//   items,
//   value,
//   onChange,
//   disabled,
//   placeholder = "Select option...",
// }: ComboboxProps) {
//   const [open, setOpen] = React.useState(false)
//   const [searchQuery, setSearchQuery] = React.useState("")

//   const filteredItems = React.useMemo(() => {
//     if (!searchQuery) return items
//     return items.filter((item) =>
//       item.label.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   }, [items, searchQuery])

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-full justify-between"
//           disabled={disabled}
//         >
//           {value
//             ? items.find((item) => item.value === value)?.label
//             : placeholder}
//           <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
//         <CommandRoot>
//           <CommandInput
//             placeholder="Search..."
//             value={searchQuery}
//             onValueChange={setSearchQuery}
//           />
//           <CommandEmpty>No results found.</CommandEmpty>
//           <CommandGroup className="max-h-[300px] overflow-auto">
//             {filteredItems.map((item) => (
//               <CommandItem
//                 key={item.value}
//                 value={item.value}
//                 onSelect={(currentValue) => {
//                   onChange?.(currentValue)
//                   setOpen(false)
//                   setSearchQuery("")
//                 }}
//               >
//                 <Check
//                   className={cn(
//                     "mr-2 h-4 w-4",
//                     value === item.value ? "opacity-100" : "opacity-0"
//                   )}
//                 />
//                 {item.label}
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </CommandRoot>
//       </PopoverContent>
//     </Popover>
//   )
// }