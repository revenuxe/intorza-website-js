INSERT INTO public.blog_posts (title, slug, content, excerpt, published, category, tags, pillar_slug, created_at, updated_at)
VALUES (
  'How to Make a Professional Interior Design Quotation (with Template)',
  'how-to-make-interior-design-quotation',
  $body$# How to Make a Professional Interior Design Quotation (with Template)

A quotation is not just a price list. It is the first real document your client uses to judge you. A clear, branded, well-structured quotation closes projects that a messy Word document never will.

This guide walks through the exact structure of a professional interior design quotation, the line items to include, how to handle tax and discounts, and the terms that protect you.

## What every interior quotation must contain

At minimum, a complete quotation has:

1. **Header** — your logo, business name, GSTIN (if applicable), address, email, phone.
2. **Client block** — client name, site address, project name.
3. **Quotation number and date** — sequential numbering matters for audits.
4. **Validity** — typical: 15 or 30 days.
5. **Itemised BOQ** — grouped by room or by category.
6. **Subtotal, discount, tax, grand total.**
7. **Payment schedule** — advance, milestones, balance.
8. **Terms and conditions.**
9. **Signature block** — yours and a space for the client to sign.

Miss any of these and you create room for disputes.

## Step 1: Group by room or by category

For residential, group by **room**: Master Bedroom, Kids Bedroom, Living, Dining, Kitchen, Pooja, Balcony.

For commercial, group by **scope**: Civil, Carpentry, False Ceiling, Painting, Electrical, Plumbing, Furniture, Loose items.

Either way, clients scan the totals at each group. Your BOQ should answer "how much for the kitchen?" without making them add cells.

## Step 2: Write line items the right way

Every line item needs four columns: **description, unit, quantity, rate**. The description must include the **specification** — not just "Wardrobe" but:

> Master Bedroom wardrobe — 8 ft x 7 ft, 18mm BWP ply carcass, 0.8mm laminate finish (Greenlam), Hettich soft-close hinges and drawer channels, internal mirror.

Specifications protect you when the client later asks "why is the next floor's wardrobe cheaper?"

## Step 3: Handle materials and labour separately when it helps

For turnkey, lump the rate together. For supply-and-fix or labour-only contracts, split material and labour rates. This makes billing and any change in scope painless.

## Step 4: Tax — get this right or pay later

In India, interior work attracts GST (typically 18% for services and most furniture). Always show:

- HSN / SAC code per row.
- Taxable value.
- CGST + SGST (intra-state) or IGST (inter-state).
- Total tax and grand total.

For the full India-specific playbook, read our [GST invoice for interior designers guide](/blog/gst-invoice-interior-designers-india-guide).

## Step 5: Discount and advance, clearly stated

State discounts as a single line at the subtotal level so the client sees the gesture. Advance should be a percentage with a deadline: "30% on confirmation, within 5 working days."

## Step 6: Payment milestones

Typical turnkey milestone schedule:

- 30% advance on confirmation.
- 40% on delivery of major materials to site.
- 20% on installation of carcass / civil completion.
- 10% on handover.

Write the milestone *trigger* clearly. "On dispatch" beats "on delivery" — you cannot control client availability.

## Step 7: Terms and conditions that protect you

Always include:

- Validity period of the quotation.
- Site readiness expectations (electricity, water, storage).
- Change order policy — any client change after sign-off is quoted separately.
- Warranty (typically 1 year on workmanship, brand warranty on materials).
- Force majeure.
- Cancellation and refund.

## Step 8: Branded PDF, shareable link

A PDF that looks identical to your Instagram grid wins trust. A shareable link the client can open on phone closes faster than an email attachment.

This is where [quotation software](/blog/interior-design-quotation-software-guide) saves hours: your brand kit is applied automatically, the share link is generated, and the client signs digitally.

## Common mistakes to avoid

- **No specification on line items.** Leads to scope disputes.
- **Tax shown only at the bottom.** Auditors and clients both want per-row breakdown.
- **No validity date.** You will be held to last quarter's price.
- **No payment milestone trigger.** Cash flow suffers.
- **Word/Excel without version control.** v3 vs v4 confusion.

## Free template structure

Use this exact structure as your starting point — Intorza ships with a built-in template that matches it:

```
[Logo]   Studio Name | GSTIN | Address | Phone | Email

Quotation No: INT-2026-0042       Date: 12 Mar 2026
Validity: 30 days

Client: ___________     Site: ___________
Project: 3BHK Turnkey Interior

ROOM: MASTER BEDROOM
Sl  Description                Unit   Qty   Rate    Amount
1   Wardrobe 8x7 BWP+Lam       sqft   56    1450    81,200
2   Bed back panel             rft    7     2200    15,400
...
Subtotal (Master Bedroom): 1,12,500

[Repeat for each room]

Subtotal:           8,50,000
Discount (3%):       25,500
Taxable value:     8,24,500
CGST @9%:           74,205
SGST @9%:           74,205
Grand Total:      9,72,910

Payment Schedule:
30% on confirmation | 40% on material dispatch | 20% on carcass install | 10% handover

Terms: [...]

Authorised Signatory                Client Acceptance
```

## Next step

Open Intorza, click **New Quotation**, pick the *Residential Turnkey* template, and your first branded quotation is ready to share in 10 minutes. [Start free →](https://app.intorza.com)
$body$,
  'A step-by-step guide to writing an interior design quotation that wins projects — structure, line items, tax, terms, and a free template.',
  true,
  'Quotation Software',
  ARRAY['interior design quotation','quotation template','BOQ','cluster']::text[],
  'interior-design-quotation-software-guide',
  now() - interval '19 days',
  now() - interval '19 days'
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  content = EXCLUDED.content,
  excerpt = EXCLUDED.excerpt,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  pillar_slug = EXCLUDED.pillar_slug,
  updated_at = now();