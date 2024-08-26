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
  Video as VideoIcon,
  Paperclip,
  UserPlus,
  Hash,
  FileText,
  Download,
  Play,
  X,
  ArrowLeft,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  unread: number;
  isGroup: boolean;
  members?: { name: string; avatar: string }[];
};

const chats: Chat[] = [
  {
    id: 1,
    name: "Alice Smith",
    lastMessage: "See you tomorrow!",
    unread: 0,
    isGroup: false,
  },
  {
    id: 2,
    name: "Bob Johnson",
    lastMessage: "How's the project going?",
    unread: 2,
    isGroup: false,
  },
  {
    id: 3,
    name: "Team Alpha",
    lastMessage: "Meeting at 3 PM",
    unread: 5,
    isGroup: true,
    members: [
      { name: "You", avatar: "/placeholder-user.jpg" },
      { name: "Alice", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Bob", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Carol", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "David", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
  {
    id: 4,
    name: "Carol Williams",
    lastMessage: "Thanks for your help!",
    unread: 0,
    isGroup: false,
  },
  {
    id: 5,
    name: "Project Beta",
    lastMessage: "New designs uploaded",
    unread: 1,
    isGroup: true,
    members: [
      { name: "You", avatar: "/placeholder-user.jpg" },
      { name: "Eve", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Frank", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Grace", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Henry", avatar: "/placeholder.svg?height=32&width=32" },
    ],
  },
];

type MessageContent = {
  type: "text" | "image" | "video" | "file";
  content: string | Promise<string>;
};

type Message = {
  id: number;
  sender: string;
  content: MessageContent;
  timestamp: Date;
};

function generateRandomMessages(chat: Chat): Message[] {
  const messages: Message[] = [];
  const senders = chat.isGroup
    ? chat.members?.map((m) => m.name) || []
    : [chat.name, "You"];
  const randomNumber = Math.floor(Math.random() * 999) + 1;
  const randomMessage = fetch("https://api.quotable.io/random", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.content as string;
    });

  const contentTypes: MessageContent[] = [
    { type: "text", content: randomMessage || "Hello!" },
    { type: "image", content: `https://picsum.photos/id/${randomNumber}/300` },
    { type: "video", content: "https://www.w3schools.com/html/mov_bbb.mp4" },
    { type: "file", content: "project_report.pdf" },
  ];

  for (let i = 0; i < 10; i++) {
    const sender = senders[Math.floor(Math.random() * senders.length)];
    const contentType =
      contentTypes[Math.floor(Math.random() * contentTypes.length)];
    messages.push({
      id: i,
      sender: sender,
      content: contentType,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000)),
    });
  }

  return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export default function ChatApp() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [messages, setMessages] = useState<Message[]>([]);

  const filteredChats =
    activeTab === "all"
      ? chats
      : chats.filter((chat) =>
          activeTab === "groups" ? chat.isGroup : !chat.isGroup
        );

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    setMessages(generateRandomMessages(chat));
  };

  useEffect(() => {
    const chatList = document.getElementById("chat-list");
    if (selectedChat === null) {
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
                  src="/avatar.jpg"
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
          <Card
            id="chat-list"
            className={`lg:w-1/3 xl:w-1/4 
            ${selectedChat?.id && "hidden lg:block"}
            `}
          >
            <CardHeader>
              <CardTitle>Chats</CardTitle>
              <Tabs
                defaultValue="all"
                className="w-full"
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="direct">Direct</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-12rem)]">
                {filteredChats.map((chat) => (
                  <button
                    key={chat.id}
                    className={`flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-accent ${
                      chat.id === selectedChat?.id ? "bg-accent" : ""
                    }`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    {chat.isGroup ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Hash className="h-5 w-5" />
                      </div>
                    ) : (
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt={chat.name}
                        />
                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{chat.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {chat.lastMessage}
                      </p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {chat.unread}
                      </Badge>
                    )}
                  </button>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card
            className={`flex-1 ${selectedChat === null && "hidden lg:block"}`}
          >
            {selectedChat ? (
              <>
                <CardHeader className="flex flex-row items-center justify-center">
                  <div className="pt-1.5 mr-4 lg:hidden">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setSelectedChat(null)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                      <span className="sr-only">Close chat</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    {selectedChat.isGroup ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Hash className="h-5 w-5" />
                      </div>
                    ) : (
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg?height=40&width=40"
                          alt={selectedChat.name}
                        />
                        <AvatarFallback>
                          {selectedChat.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <CardTitle>{selectedChat.name}</CardTitle>
                      <CardDescription>
                        {selectedChat.isGroup
                          ? `${selectedChat.members?.length} members`
                          : "Online"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    {selectedChat.isGroup && (
                      <Button size="icon" variant="ghost">
                        <UserPlus className="h-4 w-4" />
                        <span className="sr-only">Add member</span>
                      </Button>
                    )}
                    <Button size="icon" variant="ghost">
                      <Phone className="h-4 w-4" />
                      <span className="sr-only">Call</span>
                    </Button>
                    <Button size="icon" variant="ghost">
                      <VideoIcon className="h-4 w-4" />
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
                        {selectedChat.isGroup ? (
                          <DropdownMenuItem>Leave group</DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>Block contact</DropdownMenuItem>
                        )}
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
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === "You"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          {selectedChat.isGroup && message.sender !== "You" && (
                            <Avatar className="mr-2 h-8 w-8">
                              <AvatarImage
                                src={
                                  selectedChat.members?.find(
                                    (m) => m.name === message.sender
                                  )?.avatar ||
                                  "/placeholder.svg?height=32&width=32"
                                }
                                alt={message.sender}
                              />
                              <AvatarFallback>
                                {message.sender.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[75%] rounded-lg p-4 ${
                              message.sender === "You"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            {selectedChat.isGroup &&
                              message.sender !== "You" && (
                                <p className="mb-1 text-xs font-semibold">
                                  {message.sender}
                                </p>
                              )}
                            {message.content.type === "text" && (
                              <p>{message.content.content}</p>
                            )}
                            {message.content.type === "image" && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <div className="relative h-48 w-48 cursor-pointer overflow-hidden rounded-md">
                                    <Image
                                      src={message.content.content as string}
                                      alt="Shared image"
                                      layout="fill"
                                      objectFit="cover"
                                    />
                                  </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[800px]">
                                  <DialogHeader>
                                    <DialogTitle>Image</DialogTitle>
                                    <DialogDescription>
                                      Shared by {message.sender}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="relative h-[600px] w-full">
                                    <Image
                                      src={message.content.content as string}
                                      alt="Shared image"
                                      layout="fill"
                                      objectFit="contain"
                                    />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                            {message.content.type === "video" && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <div className="relative h-48 w-48 cursor-pointer overflow-hidden rounded-md">
                                    <video className="h-full w-full object-cover">
                                      <source
                                        src={message.content.content as string}
                                        type="video/mp4"
                                      />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                      <Play className="h-12 w-12 text-white" />
                                    </div>
                                  </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[800px]">
                                  <DialogHeader>
                                    <DialogTitle>Video</DialogTitle>
                                    <DialogDescription>
                                      Shared by {message.sender}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="relative h-[600px] w-full">
                                    <video controls className="h-full w-full">
                                      <source
                                        src={message.content.content as string}
                                        type="video/mp4"
                                      />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                            {message.content.type === "file" && (
                              <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                <span>{message.content.content}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-black"
                                >
                                  <Download className="mr-2 h-4 w-4 text-black" />
                                  Download
                                </Button>
                              </div>
                            )}
                            <p className="mt-1 text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="py-3">
                  <form className="flex w-full items-center space-x-2 ">
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
