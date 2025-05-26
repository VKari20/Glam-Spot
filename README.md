# Glam-Spot
# 💇‍♀️ Salon Loyalty Rewards App

A simple, real-time loyalty tracking system built for salons using **Bolt** for the frontend and **Supabase** as the backend database.

This app helps salons reward loyal customers based on the number of visits — using just a phone number to check in!

---

## ✨ What It Does

- 🧾 Salon staff enter a customer's phone number to check them in.
- 🔢 Tracks number of visits automatically.
- 🎁 Rewards are granted after a set number of visits (e.g. free hair wash or styling).
- 📋 Salon owners can view all customers, their visits, and rewards in real-time.

---

## 🧱 Tech Stack

- **Frontend**: [Bolt (buildwithbolt.dev)](https://buildwithbolt.dev)
- **Backend**: [Supabase](https://supabase.io)
- **Database**: PostgreSQL (via Supabase)

---

## 🗂️ Database Tables (Supabase)

### Table: `customers`

| Column Name     | Type      | Description                          |
|-----------------|-----------|--------------------------------------|
| `id`            | UUID      | Primary key                          |
| `phone_number`  | Text      | Unique identifier (customer's phone) |
| `visits`        | Integer   | Total number of salon visits         |
| `last_checkin`  | Timestamp | Most recent check-in time            |
| `reward_status` | Text      | e.g. "None", "Free Hair Wash"        |
| `reward_claimed`| Boolean   | Whether the reward has been claimed  |
| `created_at`    | Timestamp | When the record was created          |

```sql
create table customers (
  id uuid primary key default uuid_generate_v4(),
  phone_number text unique not null,
  visits integer default 0,
  last_checkin timestamp with time zone default now(),
  reward_status text default 'None',
  reward_claimed boolean default false,
  created_at timestamp with time zone default now()
);
