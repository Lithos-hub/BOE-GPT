import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header>
      <AppBar
        position="sticky"
        className="rounded-xl w-[70vw] mx-auto bg-gradient-to-bl from-primary-1 to-primary-2 text-white"
      >
        <Toolbar className="flex justify-between">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BOE resumido
          </Typography>

          <div>
            <Link href="/">
              <Button variant="text">El BOE de hoy</Button>
            </Link>
            <Link href="/about">
              <Button variant="text">Acerca del proyecto</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Navbar;
