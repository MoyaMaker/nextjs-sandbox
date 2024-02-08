import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <h1>Hello there</h1>

      <SelectScrollable />

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="Item 1">Item 1</SelectItem>
          <SelectItem value="Item 2">Item 2</SelectItem>
          <SelectItem value="Item 3">Item 3</SelectItem>
          <SelectItem value="Item 4">Item 4</SelectItem>
          <SelectItem value="Item 5">Item 5</SelectItem>
          <SelectItem value="Item 6">Item 6</SelectItem>
          <SelectItem value="Item 7">Item 7</SelectItem>
          <SelectItem value="Item 8">Item 8</SelectItem>
          <SelectItem value="Item 9">Item 9</SelectItem>
          <SelectItem value="Item 10">Item 10</SelectItem>
          <SelectItem value="Item 11">Item 11</SelectItem>
          <SelectItem value="Item 12">Item 12</SelectItem>
          <SelectItem value="Item 13">Item 13</SelectItem>
          <SelectItem value="Item 14">Item 14</SelectItem>
          <SelectItem value="Item 15">Item 15</SelectItem>
          <SelectItem value="Item 16">Item 16</SelectItem>
          <SelectItem value="Item 17">Item 17</SelectItem>
          <SelectItem value="Item 18">Item 18</SelectItem>
          <SelectItem value="Item 19">Item 19</SelectItem>
          <SelectItem value="Item 20">Item 20</SelectItem>
        </SelectContent>
      </Select>
    </main>
  );
}

export function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
          <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
          <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
          <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
          <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
          <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe & Africa</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
          <SelectItem value="west">
            Western European Summer Time (WEST)
          </SelectItem>
          <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
          <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
          <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
          <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
          <SelectItem value="ist_indonesia">
            Indonesia Central Standard Time (WITA)
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Australia & Pacific</SelectLabel>
          <SelectItem value="awst">
            Australian Western Standard Time (AWST)
          </SelectItem>
          <SelectItem value="acst">
            Australian Central Standard Time (ACST)
          </SelectItem>
          <SelectItem value="aest">
            Australian Eastern Standard Time (AEST)
          </SelectItem>
          <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
          <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>South America</SelectLabel>
          <SelectItem value="art">Argentina Time (ART)</SelectItem>
          <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
          <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
          <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
