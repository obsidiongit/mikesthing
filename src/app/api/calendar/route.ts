import { NextResponse } from "next/server";
import ICAL from "ical.js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/calendar, text/plain, */*"
      }
    });
    if (!res.ok) throw new Error("Failed to fetch iCal feed: " + res.statusText);
    const icalText = await res.text();
    
    const jcalData = ICAL.parse(icalText);
    const comp = new ICAL.Component(jcalData);
    const vevents = comp.getAllSubcomponents("vevent");
    
    const events = vevents.map(vevent => {
      const event = new ICAL.Event(vevent);
      return {
        id: event.uid,
        title: event.summary,
        start: event.startDate ? event.startDate.toString() : null,
        end: event.endDate ? event.endDate.toString() : null,
        description: event.description,
        location: event.location
      };
    }).filter(e => e.start);

    return NextResponse.json({ events });
  } catch (error: any) {
    console.error("Error parsing iCal:", error);
    return NextResponse.json({ error: "Failed to parse iCal feed" }, { status: 500 });
  }
}
