import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header>
      <AppBar
        position="sticky"
        elevation={10}
        className="rounded-xl w-[68vw] mx-auto bg-primary-1 bg-opacity-20 backdrop-blur-md text-white"
      >
        <Toolbar className="flex justify-between">
          <Link href="/">
            <Image
              src="/logo-banner.png"
              width="0"
              height="0"
              sizes="100vw"
              alt="BOE·GPT logo"
              className="h-[30px] w-auto"
            />
          </Link>

          <div className="flex gap-1">
            <Link href="/">
              <Button variant="contained" className="text-white bg-primary-1">
                Inicio
              </Button>
            </Link>
            <Link href="/search">
              <Button variant="contained" className="text-white bg-primary-1">
                Buscador
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="contained" className="text-white bg-primary-1">
                Sobre nosotros
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Navbar;
