"use client";
import React, { Fragment } from "react";
import Link from "next/link";
import { ChevronDown, Loader } from "lucide-react";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,  DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/Modetoggle";

const Header = () => {
  
  const { user, isAuthenticated, isLoading, error } = useKindeBrowserClient();
  return (
    <div
      className="shadow-sm w-full sticky
    top-0 bg-white dark:bg-black
        "
    >
      <div
        className="w-full mx-auto max-w-7xl
        py-2 px-5 flex items-center justify-between
        "
      >
        <div
          className="flex items-center
            flex-1 gap-9
            "
        >
          <div>
            <Link
              href="/dashboard"
              className="font-black text-[20px]
                      text-primary
                          "
            >
              CraftMyCV
            </Link>
          </div>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <span
                className="font-normal
               text-black/50
               dark:text-primary-foreground"
              >
                Hi,
              </span>
              <h5
                className="font-bold text-black 
              dark:text-primary-foreground"
              >
                {user?.given_name} {user?.family_name}
              </h5>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-4">
         <ModeToggle />
          {isLoading || error ? (
            <Loader
              className="animate-spin !size-6 text-black
          dark:text-white
                      "
            />
          ) : (
            <Fragment>
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger role="button">
                    <div className="flex items-center gap-1">
                      <Avatar role="button" className="!cursor-pointer">
                        <AvatarImage src={user?.picture || ""} />
                        <AvatarFallback className="!cursor-pointer">
                          {user?.given_name?.[0]}
                          {user?.family_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown size="17px" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="my-3">
                    <DropdownMenuItem
                      asChild
                      className="!text-red-500 !cursor-pointer font-medium"
                    >
                      <LogoutLink>Log out</LogoutLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
