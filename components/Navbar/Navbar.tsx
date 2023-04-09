import { useState } from "react";
import { useRouter } from "next/router";
import { AppBar, Toolbar, Button, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Image from "next/image";
import Link from "next/link";
import dayjs, { Dayjs } from "dayjs";
import { SearchOutlined } from "@mui/icons-material";
import { parseDate } from "@/utils";
import InfoIcon from "@mui/icons-material/Info";

const currentDate = parseDate(new Date().getTime());

const Navbar = () => {
  const [dateValue, setDateValue] = useState<Dayjs | null>(dayjs(currentDate));
  const router = useRouter();

  return (
    <header className="mx-auto h-30">
      <AppBar
        position="fixed"
        elevation={10}
        className="w-[77vw] mx-auto left-0 top-5 rounded-xl bg-primary-1 bg-opacity-10 backdrop-blur text-white"
      >
        <Toolbar className="flex flex-wrap md:flex-row gap-5 justify-center md:justify-between p-2 px-5">
          <Link href="/">
            <Image
              src="/logo-banner.png"
              width="0"
              height="0"
              sizes="100vw"
              alt="BOE·GPT logo"
              className="h-[30px] w-auto object-cover"
            />
          </Link>

          <div className="flex gap-5 items-center">
            <Link href="/about">
              <IconButton className="text-white bg-primary-1">
                <InfoIcon />
              </IconButton>
            </Link>

            <DatePicker
              label="Buscar BOE por fecha"
              value={dateValue}
              onChange={(newdateValue) => setDateValue(newdateValue)}
              format="DD-MM-YYYY"
            />
            <IconButton
              color="primary"
              aria-label="icono de búsqqueda"
              size="large"
              onClick={() => {
                router.push(`/boe/${dayjs(dateValue).format("DD-MM-YYYY")}`);
              }}
            >
              <SearchOutlined />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Navbar;
