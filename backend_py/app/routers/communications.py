from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List, Optional

router = APIRouter(prefix="/api/py/communications", tags=["Communications & Content Intelligence"])

class AnnouncementSynthesisRequest(BaseModel):
    event_title: str
    telugu_title: Optional[str] = None
    date_str: str
    venue_name: str
    city: str = "Salt Lake City, UT"
    registration_url: str
    highlights: List[str]
    contact_email: str = "contact@utahtelugu.org"

class AnnouncementSynthesisResponse(BaseModel):
    whatsapp_broadcast: str
    email_subject: str
    email_body_markdown: str
    sms_short_alert: str
    telugu_greeting: str

@router.post("/synthesize-announcement", response_model=AnnouncementSynthesisResponse)
def synthesize_announcement(req: AnnouncementSynthesisRequest):
    """
    Synthesizes multi-channel communications formatted for WhatsApp, Email Newsletter,
    and SMS broadcast with authentic Telugu cultural greetings.
    """
    telugu_h = req.telugu_title if req.telugu_title else "ఉటా తెలుగు సంఘం వేడుకలు"
    bullet_list = "\n".join([f"✨ {h}" for h in req.highlights])
    bullet_md = "\n".join([f"- **{h}**" for h in req.highlights])

    # WhatsApp Broadcast format
    whatsapp_text = (
        f"🙏 *నమస్కారం! Utah Telugu Association (UTA) Invitation*\n\n"
        f"🌟 *{req.event_title}*\n"
        f"_{telugu_h}_\n\n"
        f"📅 *Date & Time:* {req.date_str}\n"
        f"📍 *Venue:* {req.venue_name}, {req.city}\n\n"
        f"*Program Highlights:*\n{bullet_list}\n\n"
        f"🎟️ *Active UTA Members:* Complimentary Free Entry\n"
        f"👉 *Register & Download Digital Passes:* {req.registration_url}\n\n"
        f"Questions? Contact: {req.contact_email}\n"
        f"Utah Telugu Association • 501(c)(3) Non-Profit"
    )

    # Email Subject & Body
    email_subj = f"🎉 UTA Invitation: {req.event_title} — Reserve Your Family Passes"
    email_md = (
        f"# {req.event_title}\n\n"
        f"### {telugu_h}\n\n"
        f"Dear Utah Telugu Families,\n\n"
        f"Utah Telugu Association warmly invites you, your family, and friends to our grand celebration of **{req.event_title}**.\n\n"
        f"### Event Details\n"
        f"- **Date & Time:** {req.date_str} (MDT)\n"
        f"- **Location:** {req.venue_name}, {req.city}\n"
        f"- **Admission:** Complimentary for active UTA Member Families; Guest tickets available\n\n"
        f"### Program Highlights\n"
        f"{bullet_md}\n\n"
        f"Please register your family attendees early to secure your banquet tokens and digital gate check-in passes.\n\n"
        f"[**👉 Click Here to Register on UTA Digital Universe**]({req.registration_url})\n\n"
        f"Warm regards,\n\n"
        f"**Executive Committee**\n"
        f"Utah Telugu Association (UTA)"
    )

    # SMS 160-char format
    sms_text = f"UTA Event: {req.event_title} on {req.date_str} at {req.venue_name}. Free for members. Reserve family tickets: {req.registration_url}"
    if len(sms_text) > 160:
        sms_text = f"UTA: {req.event_title} on {req.date_str}. Free for members. Reserve: {req.registration_url}"

    telugu_greet = "శ్రీరస్తు • శుభమస్తు • ఉటా తెలుగు సంఘం ఆత్మీయ ఆహ్వానం"

    return AnnouncementSynthesisResponse(
        whatsapp_broadcast=whatsapp_text,
        email_subject=email_subj,
        email_body_markdown=email_md,
        sms_short_alert=sms_text,
        telugu_greeting=telugu_greet
    )
