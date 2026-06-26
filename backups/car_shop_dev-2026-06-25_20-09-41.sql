--
-- PostgreSQL database dump
--

\restrict s50Eshds4vkiqurHYZngO2E5UZ5kFso4vCjNE3xYn0dvwub6QyA5jDDkjGM6QHd

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING_DEPOSIT',
    'DEPOSIT_SECURED',
    'FINANCING_APPROVED',
    'COMPLETED',
    'CANCELLED',
    'REFUNDED'
);


ALTER TYPE public."OrderStatus" OWNER TO postgres;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'CUSTOMER',
    'SALES_REP',
    'ADMIN'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

--
-- Name: VehicleStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."VehicleStatus" AS ENUM (
    'AVAILABLE',
    'PENDING_RESERVATION',
    'RESERVED',
    'SOLD',
    'IN_TRANSIT',
    'MAINTENANCE'
);


ALTER TYPE public."VehicleStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: DealershipLocation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DealershipLocation" (
    id text NOT NULL,
    code text NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    city text NOT NULL,
    country text DEFAULT 'Morocco'::text NOT NULL,
    phone text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."DealershipLocation" OWNER TO postgres;

--
-- Name: ReservationOrder; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ReservationOrder" (
    id text NOT NULL,
    "orderNumber" text NOT NULL,
    "userId" text NOT NULL,
    "vehicleId" text NOT NULL,
    status public."OrderStatus" DEFAULT 'PENDING_DEPOSIT'::public."OrderStatus" NOT NULL,
    "depositAmount" numeric(10,2) NOT NULL,
    "finalPrice" numeric(12,2) NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ReservationOrder" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    role public."UserRole" DEFAULT 'CUSTOMER'::public."UserRole" NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    phone text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: VehicleInventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VehicleInventory" (
    id text NOT NULL,
    vin character varying(17) NOT NULL,
    make text NOT NULL,
    model text NOT NULL,
    year integer NOT NULL,
    "trim" text,
    price numeric(12,2) NOT NULL,
    mileage integer DEFAULT 0 NOT NULL,
    "exteriorColor" text NOT NULL,
    status public."VehicleStatus" DEFAULT 'AVAILABLE'::public."VehicleStatus" NOT NULL,
    "dealershipLocationId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VehicleInventory" OWNER TO postgres;

--
-- Data for Name: DealershipLocation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."DealershipLocation" (id, code, name, address, city, country, phone, "createdAt", "updatedAt") FROM stdin;
cbee7a2d-8907-4422-bcd0-94480b389063	HQ-RABAT	Aurora Premium Auto	Avenue Mohammed V	Rabat	Morocco	+212500000000	2026-06-25 12:39:43.849	2026-06-25 12:39:43.849
\.


--
-- Data for Name: ReservationOrder; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ReservationOrder" (id, "orderNumber", "userId", "vehicleId", status, "depositAmount", "finalPrice", "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, "passwordHash", role, "firstName", "lastName", phone, "createdAt", "updatedAt") FROM stdin;
29e63199-4a34-4fb5-89a6-4d2c4cf61126	abdessamad@cherkaoui.dev	$2a$12$kIiEfhRJH83DBgl2BDp9UeEM8y1MMmrRkKWE3G/jWINk30/QEQCNm	CUSTOMER	Abdessamad	Cherkaoui	\N	2026-06-25 12:28:16.751	2026-06-25 12:28:16.751
\.


--
-- Data for Name: VehicleInventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VehicleInventory" (id, vin, make, model, year, "trim", price, mileage, "exteriorColor", status, "dealershipLocationId", "createdAt", "updatedAt") FROM stdin;
7651094d-b193-4018-ba96-888139f51158	WBA00000000000001	BMW	M4 Competition	2026	\N	950000.00	0	Isle of Man Green	AVAILABLE	cbee7a2d-8907-4422-bcd0-94480b389063	2026-06-25 12:39:43.869	2026-06-25 12:39:43.869
9b55b095-0a53-4e73-8747-d820a1eba5e2	WP000000000000002	Porsche	911 GT3	2025	\N	2100000.00	0	Shark Blue	AVAILABLE	cbee7a2d-8907-4422-bcd0-94480b389063	2026-06-25 12:39:43.869	2026-06-25 12:39:43.869
1b0f03b5-33ef-4781-a8e8-fffd7d212f0f	1HG00000000000003	Honda	Civic Type R	2026	\N	550000.00	0	Championship White	AVAILABLE	cbee7a2d-8907-4422-bcd0-94480b389063	2026-06-25 12:39:43.869	2026-06-25 12:39:43.869
\.


--
-- Name: DealershipLocation DealershipLocation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DealershipLocation"
    ADD CONSTRAINT "DealershipLocation_pkey" PRIMARY KEY (id);


--
-- Name: ReservationOrder ReservationOrder_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReservationOrder"
    ADD CONSTRAINT "ReservationOrder_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VehicleInventory VehicleInventory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VehicleInventory"
    ADD CONSTRAINT "VehicleInventory_pkey" PRIMARY KEY (id);


--
-- Name: DealershipLocation_city_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "DealershipLocation_city_idx" ON public."DealershipLocation" USING btree (city);


--
-- Name: DealershipLocation_code_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "DealershipLocation_code_idx" ON public."DealershipLocation" USING btree (code);


--
-- Name: DealershipLocation_code_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "DealershipLocation_code_key" ON public."DealershipLocation" USING btree (code);


--
-- Name: ReservationOrder_orderNumber_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ReservationOrder_orderNumber_idx" ON public."ReservationOrder" USING btree ("orderNumber");


--
-- Name: ReservationOrder_orderNumber_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ReservationOrder_orderNumber_key" ON public."ReservationOrder" USING btree ("orderNumber");


--
-- Name: ReservationOrder_userId_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ReservationOrder_userId_status_idx" ON public."ReservationOrder" USING btree ("userId", status);


--
-- Name: ReservationOrder_vehicleId_status_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "ReservationOrder_vehicleId_status_idx" ON public."ReservationOrder" USING btree ("vehicleId", status);


--
-- Name: User_email_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "User_email_idx" ON public."User" USING btree (email);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VehicleInventory_dealershipLocationId_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "VehicleInventory_dealershipLocationId_idx" ON public."VehicleInventory" USING btree ("dealershipLocationId");


--
-- Name: VehicleInventory_status_make_model_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "VehicleInventory_status_make_model_idx" ON public."VehicleInventory" USING btree (status, make, model);


--
-- Name: VehicleInventory_vin_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "VehicleInventory_vin_idx" ON public."VehicleInventory" USING btree (vin);


--
-- Name: VehicleInventory_vin_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VehicleInventory_vin_key" ON public."VehicleInventory" USING btree (vin);


--
-- Name: ReservationOrder ReservationOrder_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReservationOrder"
    ADD CONSTRAINT "ReservationOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ReservationOrder ReservationOrder_vehicleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ReservationOrder"
    ADD CONSTRAINT "ReservationOrder_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES public."VehicleInventory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VehicleInventory VehicleInventory_dealershipLocationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VehicleInventory"
    ADD CONSTRAINT "VehicleInventory_dealershipLocationId_fkey" FOREIGN KEY ("dealershipLocationId") REFERENCES public."DealershipLocation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict s50Eshds4vkiqurHYZngO2E5UZ5kFso4vCjNE3xYn0dvwub6QyA5jDDkjGM6QHd

