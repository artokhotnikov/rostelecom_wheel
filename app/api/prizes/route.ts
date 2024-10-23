import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { Prize } from "@/types/Prize";

export async function POST(req: NextRequest, res: NextResponse) {
  function increaseVotesCount(array: Prize[], item: Prize) {
    const index = array.findIndex((obj) => obj.id === item.id);
    if (index !== -1) {
      // Увеличиваем votesCount у найденного объекта
      array[index].count--;
    }

    return array;
  }

  function getRandomElement(array: Prize[]) {
    const copy = array.slice().filter((item) => item.count > 0);
    const item = copy[Math.floor(Math.random() * copy.length)];

    return item;
  }

  // Путь к вашему  файлу
  const filePath = path.join(process.cwd(), "/public/data/data.json");

  // Новые данные для записи
  let newData;
  let changedItem;
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(data) as Prize[];
    changedItem = getRandomElement(jsonData);

    newData = increaseVotesCount(jsonData, changedItem);
  } catch (err) {
    return NextResponse.json({ error: "Ошибка чтения файла" }, { status: 500 });
  }

  // Запись данных в файл
  try {
    fs.writeFileSync(filePath, JSON.stringify(newData));
    return NextResponse.json(
      { message: "Данные обновлены", data: changedItem },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: "Ошибка записи файла" }, { status: 500 });
  }
}

export async function GET() {
  const filePath = path.join(process.cwd(), "/public/data/data.json");
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(data);
    return NextResponse.json(jsonData);
  } catch (err) {
    return NextResponse.json({ error: "Ошибка чтения файла" }, { status: 500 });
  }
}
