import { NextResponse } from "next/server";
import ICAL from "ical.js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch iCal feed");
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
