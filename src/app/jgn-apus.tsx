"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Send,
  Home,
  MessageSquare,
  Users2,
  Settings,
  PanelLeft,
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ChatApp() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  console.log(selectedChat);

  useEffect(() => {
    const chatList = document.getElementById("chat-list");
    if(selectedChat === null) {
      chatList?.classList.remove("hidden");
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-14 flex-col border-r bg-background lg:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
          >
            <MessageSquare className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Chat App</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Home</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="sr-only">Chats</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Chats</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Contacts</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Contacts</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col lg:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px]">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="lg:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
                >
                  <MessageSquare className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Chat App</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Home
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <MessageSquare className="h-5 w-5" />
                  Chats
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Contacts
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search chats..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="ml-2 overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="h-9 w-9 rounded-full object-cover"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col lg:flex-row">
          <Card id="chat-list" className={`lg:w-1/3 xl:w-1/4 
            ${ selectedChat && "hidden"}
            `}>
            <CardHeader>
              <CardTitle>Chats</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-8rem)]">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i}
                    className={`flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-accent ${
                      i+1 === selectedChat ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedChat(i+1)}
                  >
                    <Image
                      src={`/placeholder.svg?height=40&width=40`}
                      width={40}
                      height={40}
                      alt={`Contact ${i + 1}`}
                      className="rounded-full"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">Contact {i + 1}</h3>
                      <p className="text-sm text-muted-foreground">
                        Last message...
                      </p>
                    </div>
                    {i === 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        2
                      </Badge>
                    )}
                  </button>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className={`flex-1 ${selectedChat === null && "hidden"}`}>
            {selectedChat !== null ? (
              <>
                <CardHeader className="flex flex-row items-center">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setSelectedChat(null)}
                  >
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Close chat</span>
                  </Button>
                  <div className="flex items-center gap-4">
                    <Image
                      src="/placeholder.svg?height=40&width=40"
                      width={40}
                      height={40}
                      alt="Current chat"
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle>Contact {Number(selectedChat) + 1}</CardTitle>
                      <CardDescription>Online</CardDescription>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button size="icon" variant="ghost">
                      <Phone className="h-4 w-4" />
                      <span className="sr-only">Call</span>
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Video className="h-4 w-4" />
                      <span className="sr-only">Video call</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                        <DropdownMenuItem>Block contact</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete chat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[calc(100vh-14rem)]">
                    <div className="space-y-4 p-4">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex ${
                            i % 2 === 0 ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[75%] rounded-lg p-4 ${
                              i % 2 === 0
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <p>
                              This is a sample message from Contact{" "}
                              {Number(selectedChat) + 1}.
                            </p>
                            <p className="mt-1 text-xs opacity-70">
                              {new Date().toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <form className="flex w-full items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" className="shrink-0">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="shrink-0"
                    >
                      <Paperclip className="h-4 w-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </form>
                </CardFooter>
              </>
            ) : (
              <CardContent className="flex h-full items-center justify-center">
                <p className="text-center text-muted-foreground">
                  Select a chat to start messaging
                </p>
              </CardContent>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}
