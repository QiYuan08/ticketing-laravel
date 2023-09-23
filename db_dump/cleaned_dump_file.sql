--
-- PostgreSQL database dump
--

-- Dumped from database version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    customer_id uuid NOT NULL,
    alias_customer_id text,
    pic_name character varying(255) NOT NULL,
    phone_number character varying(20),
    mobile_number character varying(20),
    company character varying(255),
    company_address text,
    additional_info text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    deleted_at timestamp(0) without time zone,
    email character varying(255) DEFAULT ''::character varying NOT NULL,
    unknown boolean DEFAULT false NOT NULL
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- Name: email_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.email_templates (
    template_id uuid NOT NULL,
    template_name character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    "default" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.email_templates OWNER TO postgres;

--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.failed_jobs OWNER TO postgres;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.failed_jobs_id_seq OWNER TO postgres;

--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobs (
    id bigint NOT NULL,
    queue character varying(255) NOT NULL,
    payload text NOT NULL,
    attempts smallint NOT NULL,
    reserved_at integer,
    available_at integer NOT NULL,
    created_at integer NOT NULL
);


ALTER TABLE public.jobs OWNER TO postgres;

--
-- Name: jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jobs_id_seq OWNER TO postgres;

--
-- Name: jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.jobs_id_seq OWNED BY public.jobs.id;


--
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media (
    id bigint NOT NULL,
    model_type character varying(255) NOT NULL,
    model_id uuid NOT NULL,
    uuid uuid,
    collection_name character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    file_name character varying(255) NOT NULL,
    mime_type character varying(255),
    disk character varying(255) NOT NULL,
    conversions_disk character varying(255),
    size bigint NOT NULL,
    manipulations json NOT NULL,
    custom_properties json NOT NULL,
    generated_conversions json NOT NULL,
    responsive_images json NOT NULL,
    order_column integer,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.media OWNER TO postgres;

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.media_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.media_id_seq OWNER TO postgres;

--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    message_id uuid NOT NULL,
    ticket_id character varying(255) NOT NULL,
    internal_node boolean NOT NULL,
    sender_type character varying(255) NOT NULL,
    sender_id uuid NOT NULL,
    recipient_type character varying(255) NOT NULL,
    recipient_id uuid NOT NULL,
    cc json,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    payload text,
    in_reply_to character varying(255),
    "messageId" character varying(255),
    source_ticket character varying(255)
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id uuid NOT NULL,
    type character varying(255) NOT NULL,
    notifiable_type character varying(255) NOT NULL,
    notifiable_id uuid NOT NULL,
    data text NOT NULL,
    read_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: password_resets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_resets (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


ALTER TABLE public.password_resets OWNER TO postgres;

--
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.personal_access_tokens OWNER TO postgres;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.personal_access_tokens_id_seq OWNER TO postgres;

--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- Name: priority; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.priority (
    priority_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.priority OWNER TO postgres;

--
-- Name: priority_priority_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.priority_priority_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.priority_priority_id_seq OWNER TO postgres;

--
-- Name: priority_priority_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.priority_priority_id_seq OWNED BY public.priority.priority_id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    role_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    access_lvl smallint DEFAULT '1'::smallint NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_role_id_seq OWNER TO postgres;

--
-- Name: role_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_role_id_seq OWNED BY public.role.role_id;


--
-- Name: status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status (
    status_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.status OWNER TO postgres;

--
-- Name: status_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_status_id_seq OWNER TO postgres;

--
-- Name: status_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_status_id_seq OWNED BY public.status.status_id;


--
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    ticket_id character varying(255) NOT NULL,
    requestor_id uuid,
    assignee_id uuid,
    priority_id bigint,
    status_id bigint,
    type_id bigint,
    subject character varying(255) NOT NULL,
    deleted_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    latest_reference character varying(255)
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- Name: type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.type (
    type_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.type OWNER TO postgres;

--
-- Name: type_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.type_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.type_type_id_seq OWNER TO postgres;

--
-- Name: type_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.type_type_id_seq OWNED BY public.type.type_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    role_id bigint NOT NULL,
    remember_token character varying(100),
    deleted_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: jobs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs ALTER COLUMN id SET DEFAULT nextval('public.jobs_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- Name: priority priority_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.priority ALTER COLUMN priority_id SET DEFAULT nextval('public.priority_priority_id_seq'::regclass);


--
-- Name: role role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN role_id SET DEFAULT nextval('public.role_role_id_seq'::regclass);


--
-- Name: status status_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status ALTER COLUMN status_id SET DEFAULT nextval('public.status_status_id_seq'::regclass);


--
-- Name: type type_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type ALTER COLUMN type_id SET DEFAULT nextval('public.type_type_id_seq'::regclass);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (customer_id, alias_customer_id, pic_name, phone_number, mobile_number, company, company_address, additional_info, created_at, updated_at, deleted_at, email, unknown) FROM stdin;
998afaeb-da23-4546-8a9e-10b34bb387e2		qi yuan						2023-07-01 22:32:22	2023-07-01 22:32:22		chaelqi89@hotmail.com	t
998b03a1-4436-49b1-a7c4-d46cc8a63138	5WiJ0CAlTA5X	Qi Yuan	0178392235					2023-07-01 22:56:44	2023-07-01 23:35:39		qiyuanteh@gmail.com	f
998b0f9e-951a-40ed-a3f3-10daeb1917b3	RpAc1fa0s13A	Qi Yuan						2023-07-01 23:30:15	2023-07-01 23:35:51		wello@gmail.com	f
998afa1a-ca46-4315-87e9-429d19214393	2y1ZHG8nQuee	Qi Yuan gmail						2023-07-01 22:30:05	2023-07-01 23:50:01		chaelqi89@gmail.com	f
998f25bd-287b-4f4c-bc39-d8a3872f22af		Vincent Tay						2023-07-04 00:15:25	2023-07-04 00:15:25		vincenttay1230@gmail.com	t
998f26b8-56f6-4e5c-9085-4c6b04d901bb	GIPL	General Identity Pte Ltd	91239123	91239123	General Identity Pte Ltd	12 Jalan Yew Leng	<p>check what is their current IT infra setup</p>\n<p>&nbsp;</p>\n<p>SSID: xxxxx</p>\n<p>Password: xxxxx</p>\n<p>&nbsp;</p>\n<p><span style="text-decoration: underline;"><strong>Microsoft Office 365 Account</strong></span></p>\n<p>Email:&nbsp;</p>\n<p>Password:&nbsp;</p>\n<p>&nbsp;</p>\n<p>test&nbsp;</p>\n<p>test</p>	2023-07-04 00:18:09	2023-07-04 23:36:46		general@gi.com.sg	f
9998bcef-4daf-4b3d-a202-bf28ea7cf9b1		MAG IT						2023-07-08 18:40:38	2023-07-08 18:40:38		magtest12@outlook.com	t
999b2e7e-df20-4c99-accb-335fee10aaf9	MAGIT	MAG IT	1234 1234	1234 1234	MAG IT Solutions Pte Ltd			2023-07-09 23:49:50	2023-07-09 23:50:12		1234@gmail.com	f
9a1951a9-31d6-42b4-80ce-f02893ac8b23	SAV	Jenny	61236123	81238123	Sea Advance Vehicle Pte Ltd	40 Changi South		2023-09-10 16:42:29	2023-09-10 16:42:59		it@seaav.com.sg	f
9a19a4b5-e937-4c91-937b-a7ca7132f387	TNG	David Wu	84568456	84568456	The Next Generation Pte Ltd	40 Tuas Ave 1		2023-09-10 20:34:42	2023-09-10 21:57:51		david.wu121@hotmail.com	f
9a21dee0-72f4-424e-84fd-2e653efff20a	TAH	Alvis Lee		92480893	Terumo Asia Holdings Pte Ltd	300 Beach Rd, #33-03, Singapore 199555		2023-09-14 22:43:58	2023-09-14 22:44:10		tapicthelpdesk@terumo.co.jp	f
\.


--
-- Data for Name: email_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.email_templates (template_id, template_name, content, created_at, updated_at, "default") FROM stdin;
9951d51f-968e-474c-a99b-5c660d2e47bb	Default	<p><span style="font-size: 10.0pt; font-family: 'Helvetica',sans-serif;">Dear {{customer}},<br><br>We have received your request and the <strong>Case #{{ticketNumber}}</strong> has been assigned. Meanwhile, we suggest replying with case #{{ticketNumber}} in any further communication for easier reference.<br><br>While resolving your urgent issue is our top priority, each support request is replied to in the order it comes in. Rest assured that we&rsquo;re doing our very best to attend to your ticket as soon as we can!<br><em><br>** Kindly note that replying using subject #{{ticketNumber}} - #{{subject}} to make inquiries on the status will reset your support request and the ticket queue.</em></span></p>\n<p>&nbsp;</p>\n<p><span style="font-size: 10.0pt; font-family: 'Helvetica',sans-serif;"><br>Thank you for your patience.</span></p>\n<p><span style="font-size: 10.0pt; font-family: 'Helvetica',sans-serif;"><br>Sincerely,<br><br>MAGIT SOLUTIONS PTE LTD - Technical Support<br>--------------------<br>Case #{{ticketNumber}}<br>--------------------</span></p>	2023-07-01 22:25:22	2023-07-02 02:37:18	t
998b52ca-6808-4253-af71-c531ae5b7f7e	Template 1	<p>Hey yo</p>	2023-07-02 02:38:05	2023-07-02 02:38:12	f
9a195610-9345-441a-9ce5-f9ff51703409	Out Of Business Hour	<p>Dear Customer,&nbsp;</p>\n<p>&nbsp;</p>\n<p>Thank you for emailing to MAG-IT Support.</p>\n<p>We shall inform you that this is fall out of business hours.</p>\n<p><span style="text-decoration: underline;"><strong>Business Hours</strong></span></p>\n<p>Monday - Friday --- 9AM - 6PM</p>\n<p>We will get back to you on the next working day.&nbsp;</p>\n<p>&nbsp;</p>\n<p>Thank you.</p>	2023-09-10 16:54:47	2023-09-10 16:57:45	f
\.


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jobs (id, queue, payload, attempts, reserved_at, available_at, created_at) FROM stdin;
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media (id, model_type, model_id, uuid, collection_name, name, file_name, mime_type, disk, conversions_disk, size, manipulations, custom_properties, generated_conversions, responsive_images, order_column, created_at, updated_at) FROM stdin;
1	App\\Models\\Messages	998b5139-578e-46b2-85a5-55a2df6575c2	53fc79b6-1a71-4bb8-acb8-2a49808c1132	message-attachment	history (45)	history-(45).pdf	application/pdf	do_spaces	do_spaces	61566	[]	[]	[]	[]	1	2023-07-02 02:33:42	2023-07-02 02:33:42
2	App\\Models\\Messages	9991501e-9f0a-4b40-934f-73bf0c407b80	61601127-4566-4024-8179-be619bc7f3e8	message-attachment	media-libraryQeevFT	SITE_VISIT_23070008_e108db07-b137-41ae-9c94-1e581166068e.pdf	application/pdf	do_spaces	do_spaces	63647	[]	[]	[]	[]	1	2023-07-05 02:05:34	2023-07-05 02:05:34
3	App\\Models\\Messages	9a21e076-6a8f-4edb-b861-01491911d42f	576622bb-63ac-4135-b8cc-a7824a3d3bd2	message-attachment	media-libraryKMymAm	SITE_VISIT_23090003_c64ded7c-aa78-4b57-9736-fa5b143790db.pdf	application/pdf	do_spaces	do_spaces	65343	[]	[]	[]	[]	1	2023-09-14 22:48:24	2023-09-14 22:48:24
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (message_id, ticket_id, internal_node, sender_type, sender_id, recipient_type, recipient_id, cc, created_at, updated_at, payload, in_reply_to, "messageId", source_ticket) FROM stdin;
998afa1a-d38c-41c2-9cca-6e62c1d3a0e8	23070001	f	App\\Models\\Customer	998afa1a-ca46-4315-87e9-429d19214393	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-01 22:30:05	2023-07-01 22:30:05	<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv=Content-Type content="text/html; charset=utf-8"><meta name=Generator content="Microsoft Word 15 (filtered medium)"><style><!--\n/* Font Definitions */\n@font-face\n\t{font-family:"Cambria Math";\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:DengXian;\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n@font-face\n\t{font-family:Calibri;\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\n@font-face\n\t{font-family:"\\@DengXian";\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n/* Style Definitions */\np.MsoNormal, li.MsoNormal, div.MsoNormal\n\t{margin:0cm;\n\tfont-size:11.0pt;\n\tfont-family:"Calibri",sans-serif;}\na:link, span.MsoHyperlink\n\t{mso-style-priority:99;\n\tcolor:blue;\n\ttext-decoration:underline;}\n.MsoChpDefault\n\t{mso-style-type:export-only;}\n@page WordSection1\n\t{size:612.0pt 792.0pt;\n\tmargin:72.0pt 72.0pt 72.0pt 72.0pt;}\ndiv.WordSection1\n\t{page:WordSection1;}\n--></style></head><body lang=EN-MY link=blue vlink="#954F72" style='word-wrap:break-word'><div class=WordSection1><p class=MsoNormal><span lang=EN-US>This should be done already</span></p><p class=MsoNormal><o:p>&nbsp;</o:p></p><p class=MsoNormal>Sent from <a href="https://go.microsoft.com/fwlink/?LinkId=550986">Mail</a> for Windows</p><p class=MsoNormal><o:p>&nbsp;</o:p></p></div></body></html>		<A39A1CC8-9C2E-421D-A3EB-61C651788D87@hxcore.ol>	
998afa41-ad30-4e63-b09e-18f46219db7e	23070002	f	App\\Models\\Customer	998afa1a-ca46-4315-87e9-429d19214393	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-01 22:30:31	2023-07-01 22:30:31	<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv=Content-Type content="text/html; charset=utf-8"><meta name=Generator content="Microsoft Word 15 (filtered medium)"><style><!--\n/* Font Definitions */\n@font-face\n\t{font-family:"Cambria Math";\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:DengXian;\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n@font-face\n\t{font-family:Calibri;\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\n@font-face\n\t{font-family:"\\@DengXian";\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n/* Style Definitions */\np.MsoNormal, li.MsoNormal, div.MsoNormal\n\t{margin:0cm;\n\tfont-size:11.0pt;\n\tfont-family:"Calibri",sans-serif;}\na:link, span.MsoHyperlink\n\t{mso-style-priority:99;\n\tcolor:blue;\n\ttext-decoration:underline;}\n.MsoChpDefault\n\t{mso-style-type:export-only;}\n@page WordSection1\n\t{size:612.0pt 792.0pt;\n\tmargin:72.0pt 72.0pt 72.0pt 72.0pt;}\ndiv.WordSection1\n\t{page:WordSection1;}\n--></style></head><body lang=EN-MY link=blue vlink="#954F72" style='word-wrap:break-word'><div class=WordSection1><p class=MsoNormal><span lang=EN-US>This should be done already</span></p><p class=MsoNormal><o:p>&nbsp;</o:p></p><p class=MsoNormal>Sent from <a href="https://go.microsoft.com/fwlink/?LinkId=550986">Mail</a> for Windows</p><p class=MsoNormal><o:p>&nbsp;</o:p></p></div></body></html>		<A39A1CC8-9C2E-421D-A3EB-61C651788D87@hxcore.ol>	
998afa85-f2a1-4382-a3ec-52756faae098	23070001	f	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	998afa1a-ca46-4315-87e9-429d19214393		2023-07-01 22:31:16	2023-07-01 22:31:16	<p>reply me please</p>	<A39A1CC8-9C2E-421D-A3EB-61C651788D87@hxcore.ol>	<s99ca6bf8-13bc-4942-a865-c82f0399fccc@magit.sg>	
998afaeb-e1c7-4a92-a84c-e391cc251921	23070003	f	App\\Models\\Customer	998afaeb-da23-4546-8a9e-10b34bb387e2	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-01 22:32:22	2023-07-01 22:32:22	<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40">\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=us-ascii">\n<meta name="Generator" content="Microsoft Word 15 (filtered medium)">\n<style><!--\n/* Font Definitions */\n@font-face\n\t{font-family:"Cambria Math";\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:DengXian;\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n@font-face\n\t{font-family:Calibri;\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\n@font-face\n\t{font-family:"\\@DengXian";\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n/* Style Definitions */\np.MsoNormal, li.MsoNormal, div.MsoNormal\n\t{margin:0cm;\n\tfont-size:11.0pt;\n\tfont-family:"Calibri",sans-serif;}\na:link, span.MsoHyperlink\n\t{mso-style-priority:99;\n\tcolor:blue;\n\ttext-decoration:underline;}\n.MsoChpDefault\n\t{mso-style-type:export-only;}\n@page WordSection1\n\t{size:612.0pt 792.0pt;\n\tmargin:72.0pt 72.0pt 72.0pt 72.0pt;}\ndiv.WordSection1\n\t{page:WordSection1;}\n--></style>\n</head>\n<body lang="EN-MY" link="blue" vlink="#954F72" style="word-wrap:break-word">\n<div class="WordSection1">\n<p class="MsoNormal"><span lang="EN-US">Ok go</span></p>\n<p class="MsoNormal"><o:p>&nbsp;</o:p></p>\n<p class="MsoNormal">Sent from <a href="https://go.microsoft.com/fwlink/?LinkId=550986">\nMail</a> for Windows</p>\n<p class="MsoNormal"><o:p>&nbsp;</o:p></p>\n</div>\n</body>\n</html>		<PAXP251MB0672CF497F008B03BA67D238B52BA@PAXP251MB0672.EURP251.PROD.OUTLOOK.COM>	
998afaf6-d7ea-496b-b0cd-0e39200d8f5d	23070004	f	App\\Models\\Customer	998afaeb-da23-4546-8a9e-10b34bb387e2	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-01 22:32:30	2023-07-01 22:32:30	<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40">\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=us-ascii">\n<meta name="Generator" content="Microsoft Word 15 (filtered medium)">\n<style><!--\n/* Font Definitions */\n@font-face\n\t{font-family:"Cambria Math";\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:DengXian;\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n@font-face\n\t{font-family:Calibri;\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\n@font-face\n\t{font-family:"\\@DengXian";\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n/* Style Definitions */\np.MsoNormal, li.MsoNormal, div.MsoNormal\n\t{margin:0cm;\n\tfont-size:11.0pt;\n\tfont-family:"Calibri",sans-serif;}\na:link, span.MsoHyperlink\n\t{mso-style-priority:99;\n\tcolor:blue;\n\ttext-decoration:underline;}\n.MsoChpDefault\n\t{mso-style-type:export-only;}\n@page WordSection1\n\t{size:612.0pt 792.0pt;\n\tmargin:72.0pt 72.0pt 72.0pt 72.0pt;}\ndiv.WordSection1\n\t{page:WordSection1;}\n--></style>\n</head>\n<body lang="EN-MY" link="blue" vlink="#954F72" style="word-wrap:break-word">\n<div class="WordSection1">\n<p class="MsoNormal"><span lang="EN-US">Ok go</span></p>\n<p class="MsoNormal"><o:p>&nbsp;</o:p></p>\n<p class="MsoNormal">Sent from <a href="https://go.microsoft.com/fwlink/?LinkId=550986">\nMail</a> for Windows</p>\n<p class="MsoNormal"><o:p>&nbsp;</o:p></p>\n</div>\n</body>\n</html>		<PAXP251MB0672CF497F008B03BA67D238B52BA@PAXP251MB0672.EURP251.PROD.OUTLOOK.COM>	
998afbe6-963a-42c4-a896-58cf3632191b	23070001	f	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	998afa1a-ca46-4315-87e9-429d19214393		2023-07-01 22:35:07	2023-07-01 22:35:07	<p>r we replying?</p>	s99ca6bf8-13bc-4942-a865-c82f0399fccc@magit.sg	<se2ad26d1-d5eb-4c87-96de-7f35151bfdf8@magit.sg>	
998f25bd-31d7-4770-b15f-5ef38579a3f5	23070008	f	App\\Models\\Customer	998f25bd-287b-4f4c-bc39-d8a3872f22af	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-04 00:15:25	2023-07-04 00:15:25	<div dir="ltr">Hi, <div><br></div><div>My laptop spoil, please help.</div><div><br></div><div>Thank you.</div><div><br clear="all"><div><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><div><div dir="ltr"><div><div dir="ltr"><div dir="ltr"><div dir="ltr"><b>Best Regards</b>,<br><div><div>Vincent Tay</div></div><div>Email: <a href="mailto:vincenttay1230@gmail.com" target="_blank">vincenttay1230@gmail.com</a></div><div>Mobile: +65 9622 9797</div></div></div></div></div></div></div></div></div></div></div></div>		<CAEeL9x0aaDVqY-J7258G2fnUxKY5qNpYX4O6Y2mZ356rcFqE+g@mail.gmail.com>	
998b044e-c459-415b-aa7f-e8c88eaba59c	23070005	f	App\\Models\\Customer	998afaeb-da23-4546-8a9e-10b34bb387e2	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-01 22:58:37	2023-07-01 22:58:37	<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40">\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=us-ascii">\n<meta name="Generator" content="Microsoft Word 15 (filtered medium)">\n<style><!--\n/* Font Definitions */\n@font-face\n\t{font-family:"Cambria Math";\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:DengXian;\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n@font-face\n\t{font-family:Calibri;\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\n@font-face\n\t{font-family:"\\@DengXian";\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n/* Style Definitions */\np.MsoNormal, li.MsoNormal, div.MsoNormal\n\t{margin:0cm;\n\tfont-size:11.0pt;\n\tfont-family:"Calibri",sans-serif;}\na:link, span.MsoHyperlink\n\t{mso-style-priority:99;\n\tcolor:blue;\n\ttext-decoration:underline;}\n.MsoChpDefault\n\t{mso-style-type:export-only;}\n@page WordSection1\n\t{size:612.0pt 792.0pt;\n\tmargin:72.0pt 72.0pt 72.0pt 72.0pt;}\ndiv.WordSection1\n\t{page:WordSection1;}\n--></style>\n</head>\n<body lang="EN-MY" link="blue" vlink="#954F72" style="word-wrap:break-word">\n<div class="WordSection1">\n<p class="MsoNormal"><span lang="EN-US">Should not be</span></p>\n<p class="MsoNormal"><o:p>&nbsp;</o:p></p>\n<p class="MsoNormal">Sent from <a href="https://go.microsoft.com/fwlink/?LinkId=550986">\nMail</a> for Windows</p>\n<p class="MsoNormal"><o:p>&nbsp;</o:p></p>\n</div>\n</body>\n</html>		<PAXP251MB067266F0E52047486F37BC40B52BA@PAXP251MB0672.EURP251.PROD.OUTLOOK.COM>	
998b0547-485c-4344-8f1e-fee9cd70926a	23070002	t	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-01 23:01:20	2023-07-01 23:01:20	Ticket #23070002 "SPAM-MED:  Final test" was closed and merged into this ticket.			
998b0547-505d-4a3c-a4c9-895207100d89	23070002	f	App\\Models\\Customer	998afa1a-ca46-4315-87e9-429d19214393	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-01 23:01:20	2023-07-01 23:01:20	<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv=Content-Type content="text/html; charset=utf-8"><meta name=Generator content="Microsoft Word 15 (filtered medium)"><style><!--\n/* Font Definitions */\n@font-face\n\t{font-family:"Cambria Math";\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:DengXian;\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n@font-face\n\t{font-family:Calibri;\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\n@font-face\n\t{font-family:"\\@DengXian";\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n/* Style Definitions */\np.MsoNormal, li.MsoNormal, div.MsoNormal\n\t{margin:0cm;\n\tfont-size:11.0pt;\n\tfont-family:"Calibri",sans-serif;}\na:link, span.MsoHyperlink\n\t{mso-style-priority:99;\n\tcolor:blue;\n\ttext-decoration:underline;}\n.MsoChpDefault\n\t{mso-style-type:export-only;}\n@page WordSection1\n\t{size:612.0pt 792.0pt;\n\tmargin:72.0pt 72.0pt 72.0pt 72.0pt;}\ndiv.WordSection1\n\t{page:WordSection1;}\n--></style></head><body lang=EN-MY link=blue vlink="#954F72" style='word-wrap:break-word'><div class=WordSection1><p class=MsoNormal><span lang=EN-US>This should be done already</span></p><p class=MsoNormal><o:p>&nbsp;</o:p></p><p class=MsoNormal>Sent from <a href="https://go.microsoft.com/fwlink/?LinkId=550986">Mail</a> for Windows</p><p class=MsoNormal><o:p>&nbsp;</o:p></p></div></body></html>		<A39A1CC8-9C2E-421D-A3EB-61C651788D87@hxcore.ol>	23070001
998b0547-51f4-44e0-9843-0bcb8e6bf1fe	23070002	f	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	998afa1a-ca46-4315-87e9-429d19214393		2023-07-01 23:01:20	2023-07-01 23:01:20	<p>reply me please</p>	<A39A1CC8-9C2E-421D-A3EB-61C651788D87@hxcore.ol>	<s99ca6bf8-13bc-4942-a865-c82f0399fccc@magit.sg>	23070001
998b0547-53c9-4b8f-a985-4560f45deb37	23070002	f	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	998afa1a-ca46-4315-87e9-429d19214393		2023-07-01 23:01:20	2023-07-01 23:01:20	<p>r we replying?</p>	s99ca6bf8-13bc-4942-a865-c82f0399fccc@magit.sg	<se2ad26d1-d5eb-4c87-96de-7f35151bfdf8@magit.sg>	23070001
998b0547-555a-4d88-8392-304dbfce766d	23070001	t	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-01 23:01:20	2023-07-01 23:01:20	This ticket was closed and merged into ticket #23070002 "SPAM-MED:  Final test"			
998b5139-578e-46b2-85a5-55a2df6575c2	23070005	f	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	998afaeb-da23-4546-8a9e-10b34bb387e2		2023-07-02 02:33:42	2023-07-02 02:33:42	<p>ok</p>	<PAXP251MB067266F0E52047486F37BC40B52BA@PAXP251MB0672.EURP251.PROD.OUTLOOK.COM>	<sd2476b6b-9be7-460d-b198-3ddcb6bd1e7d@magit.sg>	
998b51c5-0184-4f54-aa86-09b1ba5f8563	23070006	f	App\\Models\\Customer	998b03a1-4436-49b1-a7c4-d46cc8a63138	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-02 02:35:13	2023-07-02 02:35:13	<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv=Content-Type content="text/html; charset=utf-8"><meta name=Generator content="Microsoft Word 15 (filtered medium)"><style><!--\n/* Font Definitions */\n@font-face\n\t{font-family:"Cambria Math";\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:DengXian;\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n@font-face\n\t{font-family:Calibri;\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\n@font-face\n\t{font-family:"\\@DengXian";\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n/* Style Definitions */\np.MsoNormal, li.MsoNormal, div.MsoNormal\n\t{margin:0cm;\n\tfont-size:11.0pt;\n\tfont-family:"Calibri",sans-serif;}\na:link, span.MsoHyperlink\n\t{mso-style-priority:99;\n\tcolor:blue;\n\ttext-decoration:underline;}\n.MsoChpDefault\n\t{mso-style-type:export-only;}\n@page WordSection1\n\t{size:612.0pt 792.0pt;\n\tmargin:72.0pt 72.0pt 72.0pt 72.0pt;}\ndiv.WordSection1\n\t{page:WordSection1;}\n--></style></head><body lang=EN-MY link=blue vlink="#954F72" style='word-wrap:break-word'><div class=WordSection1><p class=MsoNormal><o:p>&nbsp;</o:p></p><p class=MsoNormal><o:p>&nbsp;</o:p></p><p class=MsoNormal>Sent from <a href="https://go.microsoft.com/fwlink/?LinkId=550986">Mail</a> for Windows</p><p class=MsoNormal>ddddd<o:p></o:p></p></div></body></html>		<2D088254-0875-4585-AA90-FE7C40451C5E@hxcore.ol>	
998b520c-4d3a-4ea9-abd0-bf4a3e71426f	23070005	f	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	998afaeb-da23-4546-8a9e-10b34bb387e2		2023-07-02 02:36:00	2023-07-02 02:36:00	<p>bbbbbbbb</p>	sd2476b6b-9be7-460d-b198-3ddcb6bd1e7d@magit.sg	<sb7010842-c187-4886-a173-80d78193855e@magit.sg>	
998b527d-4506-40bc-99f5-c03f87428d29	23070007	f	App\\Models\\Customer	998b03a1-4436-49b1-a7c4-d46cc8a63138	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-02 02:37:14	2023-07-02 02:37:14	<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv=Content-Type content="text/html; charset=utf-8"><meta name=Generator content="Microsoft Word 15 (filtered medium)"><style><!--\n/* Font Definitions */\n@font-face\n\t{font-family:"Cambria Math";\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:DengXian;\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n@font-face\n\t{font-family:Calibri;\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\n@font-face\n\t{font-family:"\\@DengXian";\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n/* Style Definitions */\np.MsoNormal, li.MsoNormal, div.MsoNormal\n\t{margin:0cm;\n\tfont-size:11.0pt;\n\tfont-family:"Calibri",sans-serif;}\na:link, span.MsoHyperlink\n\t{mso-style-priority:99;\n\tcolor:blue;\n\ttext-decoration:underline;}\n.MsoChpDefault\n\t{mso-style-type:export-only;}\n@page WordSection1\n\t{size:612.0pt 792.0pt;\n\tmargin:72.0pt 72.0pt 72.0pt 72.0pt;}\ndiv.WordSection1\n\t{page:WordSection1;}\n--></style></head><body lang=EN-MY link=blue vlink="#954F72" style='word-wrap:break-word'><div class=WordSection1><p class=MsoNormal><o:p>&nbsp;</o:p></p><p class=MsoNormal><o:p>&nbsp;</o:p></p><p class=MsoNormal>Sent from <a href="https://go.microsoft.com/fwlink/?LinkId=550986">Mail</a> for Windows</p><p class=MsoNormal><o:p>&nbsp;</o:p></p></div></body></html>		<C58431F4-786A-403E-B828-4A52B9DBB4B0@hxcore.ol>	
998f275b-c809-4335-84dc-ea01ea380a43	23070008	f	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	998f25bd-287b-4f4c-bc39-d8a3872f22af		2023-07-04 00:19:56	2023-07-04 00:19:56	<p>Hi, can you give me the remote ID?</p>\n<p>Thank you.</p>	<CAEeL9x0aaDVqY-J7258G2fnUxKY5qNpYX4O6Y2mZ356rcFqE+g@mail.gmail.com>	<sae463bac-fbe4-4c29-8685-9157dda8ebb5@magit.sg>	
998f289b-5f5c-46d1-aa3e-3ab0fee4ba95	23070008	f	App\\Models\\Customer	998f25bd-287b-4f4c-bc39-d8a3872f22af	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-04 00:23:26	2023-07-04 00:23:26	<div dir="ltr">Hi Support, <div><br></div><div>ID:1234567</div><div>Password: qwerasdf</div><div><br></div><div>Thank you.</div><div><br clear="all"><div><div dir="ltr" class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><div><div dir="ltr"><div><div dir="ltr"><div dir="ltr"><div dir="ltr"><b>Best Regards</b>,<br><div><div>Vincent Tay</div></div><div>Email: <a href="mailto:vincenttay1230@gmail.com" target="_blank">vincenttay1230@gmail.com</a></div><div>Mobile: +65 9622 9797</div></div></div></div></div></div></div></div></div></div><br></div></div><br><div class="gmail_quote"><div dir="ltr" class="gmail_attr">On Tue, Jul 4, 2023 at 12:20 AM support - MAGIT &lt;<a href="mailto:support@magit.sg">support@magit.sg</a>&gt; wrote:<br></div><blockquote class="gmail_quote" style="margin:0px 0px 0px 0.8ex;border-left:1px solid rgb(204,204,204);padding-left:1ex"><u></u>\n\n    \n        \n        \n\n        \n\n        \n        \n        \n\n    \n    <div>\n        <p>Hi, can you give me the remote ID?</p>\n<p>Thank you.</p>\n    </div>\n\n\n\n</blockquote></div>	<sae463bac-fbe4-4c29-8685-9157dda8ebb5@magit.sg>	<CAEeL9x1YOS_Rf2wzr0YpWQeJowh8HwjOVp9VJGJTLF6i8_A+bg@mail.gmail.com>	
999113b8-7ce5-484f-bfff-b9624691d975	23070008	f	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	998f25bd-287b-4f4c-bc39-d8a3872f22af		2023-07-04 23:16:41	2023-07-04 23:16:41	<p>hi,</p>\n<p>&nbsp;</p>\n<p>we are currentyly out of business hour.</p>\n<p>&nbsp;</p>\n<p>will reply on next working day.</p>\n<p>&nbsp;</p>\n<p>thank you</p>	<CAEeL9x1YOS_Rf2wzr0YpWQeJowh8HwjOVp9VJGJTLF6i8_A+bg@mail.gmail.com>	<s21622e6f-9596-46e0-9838-2f4cf9e488ee@magit.sg>	
9991143e-c9d8-48c6-aa0a-b6504fb92571	23070008	t	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	998f25bd-287b-4f4c-bc39-d8a3872f22af		2023-07-04 23:18:09	2023-07-04 23:18:09	<p>take note on this</p>	s21622e6f-9596-46e0-9838-2f4cf9e488ee@magit.sg	<s4a7f6b75-c6f7-4467-8c30-eafd7ce407d2@magit.sg>	
9991501e-9f0a-4b40-934f-73bf0c407b80	23070008	t	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	998f25bd-287b-4f4c-bc39-d8a3872f22af		2023-07-05 02:05:34	2023-07-05 02:05:34	A site visit was completed, with the attached details	s21622e6f-9596-46e0-9838-2f4cf9e488ee@magit.sg	<s54a76db9-4971-4998-a30d-167110b8e689@magit.sg>	
9998bcef-56fd-4b5e-8a74-83e5423c0e0f	23070009	f	App\\Models\\Customer	9998bcef-4daf-4b3d-a202-bf28ea7cf9b1	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-08 18:40:38	2023-07-08 18:40:38	<html>\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">\n<style type="text/css" style="display:none;"> P {margin-top:0;margin-bottom:0;} </style>\n</head>\n<body dir="ltr">\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\ntest 123 123</div>\n</body>\n</html>		<TYZPR04MB59025D10C745A26AC9F4F4CDA232A@TYZPR04MB5902.apcprd04.prod.outlook.com>	
999906ab-f23c-4779-b71b-b7c1be7c0ef8	23070009	f	App\\Models\\User	99990640-7fc0-4a36-85c3-0bd6917a99b7	App\\Models\\Customer	9998bcef-4daf-4b3d-a202-bf28ea7cf9b1		2023-07-08 22:06:49	2023-07-08 22:06:49	<p>do test 123 123 123 123</p>\n<p>&nbsp;</p>	<TYZPR04MB59025D10C745A26AC9F4F4CDA232A@TYZPR04MB5902.apcprd04.prod.outlook.com>	<s9612a3d4-4d3c-4c1d-bfdc-05bc6842e076@magit.sg>	
99990732-7185-4bd8-b40f-d5cca17d6ca0	23070009	f	App\\Models\\User	99990640-7fc0-4a36-85c3-0bd6917a99b7	App\\Models\\Customer	9998bcef-4daf-4b3d-a202-bf28ea7cf9b1		2023-07-08 22:08:17	2023-07-08 22:08:17	<p><span style="text-decoration: underline;"><strong>Example</strong></span></p>\n<p>Model: Lenovo T12s</p>\n<p>Price: $1500 exclude GST</p>\n<p>Warranty: 3 years</p>\n<p>Accesories: bag and wired mouse</p>	s9612a3d4-4d3c-4c1d-bfdc-05bc6842e076@magit.sg	<sd416788c-5736-4726-b6bb-37d5f90860c9@magit.sg>	
999adb93-011c-49dc-bcd3-74f24f65dc15	23070009	f	App\\Models\\Customer	9998bcef-4daf-4b3d-a202-bf28ea7cf9b1	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-09 19:57:58	2023-07-09 19:57:58	<html>\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=us-ascii">\n<style type="text/css" style="display:none;"> P {margin-top:0;margin-bottom:0;} </style>\n</head>\n<body dir="ltr">\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\nLet me consider on this, is there anymore discount?</div>\n<div id="appendonsend"></div>\n<hr style="display:inline-block;width:98%" tabindex="-1">\n<div id="divRplyFwdMsg" dir="ltr"><font face="Calibri, sans-serif" style="font-size:11pt" color="#000000"><b>From:</b> support - MAGIT &lt;support@magit.sg&gt;<br>\n<b>Sent:</b> Saturday, July 8, 2023 10:08 PM<br>\n<b>To:</b> magtest12@outlook.com &lt;magtest12@outlook.com&gt;<br>\n<b>Subject:</b> test 123</font>\n<div>&nbsp;</div>\n</div>\n<div class="x_font-sans x_antialiased">\n<p><span style="text-decoration:underline"><strong>Example</strong></span></p>\n<p>Model: Lenovo T12s</p>\n<p>Price: $1500 exclude GST</p>\n<p>Warranty: 3 years</p>\n<p>Accesories: bag and wired mouse</p>\n</div>\n</body>\n</html>	<sd416788c-5736-4726-b6bb-37d5f90860c9@magit.sg>	<TYZPR04MB59029EE691070AF76B671972A233A@TYZPR04MB5902.apcprd04.prod.outlook.com>	
999ae75e-55d2-4499-b609-f542d47b771d	23070009	f	App\\Models\\User	99990640-7fc0-4a36-85c3-0bd6917a99b7	App\\Models\\Customer	9998bcef-4daf-4b3d-a202-bf28ea7cf9b1		2023-07-09 20:30:57	2023-07-09 20:30:57	<p>this is the best price.</p>	<TYZPR04MB59029EE691070AF76B671972A233A@TYZPR04MB5902.apcprd04.prod.outlook.com>	<sc4af22b1-1be5-49e3-81b2-7d3b74aea296@magit.sg>	
999af560-5d97-49cc-aa93-3696268733aa	23070009	f	App\\Models\\Customer	9998bcef-4daf-4b3d-a202-bf28ea7cf9b1	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-07-09 21:10:07	2023-07-09 21:10:07	<html>\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=us-ascii">\n<style type="text/css" style="display:none;"> P {margin-top:0;margin-bottom:0;} </style>\n</head>\n<body dir="ltr">\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\nok, let proce4ed for this order.</div>\n<div id="appendonsend"></div>\n<hr style="display:inline-block;width:98%" tabindex="-1">\n<div id="divRplyFwdMsg" dir="ltr"><font face="Calibri, sans-serif" style="font-size:11pt" color="#000000"><b>From:</b> support - MAGIT &lt;support@magit.sg&gt;<br>\n<b>Sent:</b> Sunday, July 9, 2023 8:31 PM<br>\n<b>To:</b> magtest12@outlook.com &lt;magtest12@outlook.com&gt;<br>\n<b>Subject:</b> test 123</font>\n<div>&nbsp;</div>\n</div>\n<div class="x_font-sans x_antialiased">\n<p>this is the best price.</p>\n</div>\n</body>\n</html>	<sc4af22b1-1be5-49e3-81b2-7d3b74aea296@magit.sg>	<TYZPR04MB590258A858034699DE5139B8A233A@TYZPR04MB5902.apcprd04.prod.outlook.com>	
999b2bd9-0c7f-4659-a493-7991a245cbe0	23070009	f	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	9998bcef-4daf-4b3d-a202-bf28ea7cf9b1		2023-07-09 23:42:26	2023-07-09 23:42:26	<p>Ok we shall proceed this order, it will takes about 3-5 working days.</p>	<TYZPR04MB590258A858034699DE5139B8A233A@TYZPR04MB5902.apcprd04.prod.outlook.com>	<sd5dea840-2803-4b09-ab1a-f6bf1bfdd881@magit.sg>	
9a197902-487b-4814-af93-ab760dce7521	23090001	f	App\\Models\\Customer	998afa1a-ca46-4315-87e9-429d19214393	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-09-10 18:32:30	2023-09-10 18:32:30	<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv=Content-Type content="text/html; charset=utf-8"><meta name=Generator content="Microsoft Word 15 (filtered medium)"><style><!--\n/* Font Definitions */\n@font-face\n\t{font-family:"Cambria Math";\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:DengXian;\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n@font-face\n\t{font-family:Calibri;\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\n@font-face\n\t{font-family:"\\@DengXian";\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n/* Style Definitions */\np.MsoNormal, li.MsoNormal, div.MsoNormal\n\t{margin:0cm;\n\tfont-size:11.0pt;\n\tfont-family:"Calibri",sans-serif;}\na:link, span.MsoHyperlink\n\t{mso-style-priority:99;\n\tcolor:blue;\n\ttext-decoration:underline;}\n.MsoChpDefault\n\t{mso-style-type:export-only;}\n@page WordSection1\n\t{size:612.0pt 792.0pt;\n\tmargin:72.0pt 72.0pt 72.0pt 72.0pt;}\ndiv.WordSection1\n\t{page:WordSection1;}\n--></style></head><body lang=EN-MY link=blue vlink="#954F72" style='word-wrap:break-word'><div class=WordSection1><p class=MsoNormal><span lang=EN-US>dgfsfgsdfg</span></p><p class=MsoNormal><o:p>&nbsp;</o:p></p><p class=MsoNormal>Sent from <a href="https://go.microsoft.com/fwlink/?LinkId=550986">Mail</a> for Windows</p><p class=MsoNormal><o:p>&nbsp;</o:p></p></div></body></html>		<97677D06-FDA6-4374-9E7B-1C85F4A82BBB@hxcore.ol>	
9a1979b9-d864-4b5d-9d03-c3d2f540e6cb	23090002	f	App\\Models\\Customer	998afa1a-ca46-4315-87e9-429d19214393	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-09-10 18:34:30	2023-09-10 18:34:30	<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv=Content-Type content="text/html; charset=utf-8"><meta name=Generator content="Microsoft Word 15 (filtered medium)"><style><!--\n/* Font Definitions */\n@font-face\n\t{font-family:"Cambria Math";\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:DengXian;\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n@font-face\n\t{font-family:Calibri;\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\n@font-face\n\t{font-family:"\\@DengXian";\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n/* Style Definitions */\np.MsoNormal, li.MsoNormal, div.MsoNormal\n\t{margin:0cm;\n\tfont-size:11.0pt;\n\tfont-family:"Calibri",sans-serif;}\na:link, span.MsoHyperlink\n\t{mso-style-priority:99;\n\tcolor:blue;\n\ttext-decoration:underline;}\n.MsoChpDefault\n\t{mso-style-type:export-only;}\n@page WordSection1\n\t{size:612.0pt 792.0pt;\n\tmargin:72.0pt 72.0pt 72.0pt 72.0pt;}\ndiv.WordSection1\n\t{page:WordSection1;}\n--></style></head><body lang=EN-MY link=blue vlink="#954F72" style='word-wrap:break-word'><div class=WordSection1><p class=MsoNormal><span lang=EN-US>dgfsfgsdfg</span></p><p class=MsoNormal><o:p>&nbsp;</o:p></p><p class=MsoNormal>Sent from <a href="https://go.microsoft.com/fwlink/?LinkId=550986">Mail</a> for Windows</p><p class=MsoNormal><o:p>&nbsp;</o:p></p></div></body></html>		<97677D06-FDA6-4374-9E7B-1C85F4A82BBB@hxcore.ol>	
9a197a3f-8297-43bd-b640-59cd1c0a41af	23090001	f	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	998afa1a-ca46-4315-87e9-429d19214393		2023-09-10 18:35:58	2023-09-10 18:35:58	<p>reply and see</p>	<97677D06-FDA6-4374-9E7B-1C85F4A82BBB@hxcore.ol>	<s7eb63ac3-2e90-4a47-8822-399437ad62d5@magit.sg>	
9a197be0-5f73-4ad6-9fe0-d57b87812280	23090001	f	App\\Models\\Customer	998afa1a-ca46-4315-87e9-429d19214393	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-09-10 18:40:31	2023-09-10 18:40:31	<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns:m="http://schemas.microsoft.com/office/2004/12/omml" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv=Content-Type content="text/html; charset=utf-8"><meta name=Generator content="Microsoft Word 15 (filtered medium)"><style><!--\n/* Font Definitions */\n@font-face\n\t{font-family:"Cambria Math";\n\tpanose-1:2 4 5 3 5 4 6 3 2 4;}\n@font-face\n\t{font-family:DengXian;\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n@font-face\n\t{font-family:Calibri;\n\tpanose-1:2 15 5 2 2 2 4 3 2 4;}\n@font-face\n\t{font-family:"\\@DengXian";\n\tpanose-1:2 1 6 0 3 1 1 1 1 1;}\n/* Style Definitions */\np.MsoNormal, li.MsoNormal, div.MsoNormal\n\t{margin:0cm;\n\tfont-size:11.0pt;\n\tfont-family:"Calibri",sans-serif;}\na:link, span.MsoHyperlink\n\t{mso-style-priority:99;\n\tcolor:blue;\n\ttext-decoration:underline;}\n.MsoChpDefault\n\t{mso-style-type:export-only;}\n@page WordSection1\n\t{size:612.0pt 792.0pt;\n\tmargin:72.0pt 72.0pt 72.0pt 72.0pt;}\ndiv.WordSection1\n\t{page:WordSection1;}\n--></style></head><body lang=EN-MY link=blue vlink="#954F72" style='word-wrap:break-word'><div class=WordSection1><p class=MsoNormal><span lang=EN-US>Got it </span></p><p class=MsoNormal><o:p>&nbsp;</o:p></p><p class=MsoNormal>Sent from <a href="https://go.microsoft.com/fwlink/?LinkId=550986">Mail</a> for Windows</p><p class=MsoNormal><o:p>&nbsp;</o:p></p><div style='mso-element:para-border-div;border:none;border-top:solid #E1E1E1 1.0pt;padding:3.0pt 0cm 0cm 0cm'><p class=MsoNormal style='border:none;padding:0cm'><b>From: </b><a href="mailto:support@magit.sg">support - MAGIT</a><br><b>Sent: </b>Sunday, 10 September, 2023 6:36 PM<br><b>To: </b><a href="mailto:chaelqi89@gmail.com">chaelqi89@gmail.com</a><br><b>Subject: </b>Test 2</p></div><p class=MsoNormal><o:p>&nbsp;</o:p></p><p><span lang=EN>reply and see<o:p></o:p></span></p><p class=MsoNormal><o:p>&nbsp;</o:p></p></div></body></html>	<s7eb63ac3-2e90-4a47-8822-399437ad62d5@magit.sg>	<5CAF4F30-8A7D-441B-A1B8-B658446D63EF@hxcore.ol>	
9a19a4b5-ee88-4e4e-886b-5780caf808d3	23090003	f	App\\Models\\Customer	9a19a4b5-e937-4c91-937b-a7ca7132f387	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-09-10 20:34:42	2023-09-10 20:34:42	<html>\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">\n<style type="text/css" style="display:none;"> P {margin-top:0;margin-bottom:0;} </style>\n</head>\n<body dir="ltr">\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\nHi</div>\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\n<br>\n</div>\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\nPlease help to check the office have no internet</div>\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\nURGENT!!!</div>\n</body>\n</html>		<PUZPR04MB67955087CD3E70E33EE2C9E0AFF3A@PUZPR04MB6795.apcprd04.prod.outlook.com>	
9a19b43e-6592-4dfd-a342-04690221a874	23090003	f	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	9a19a4b5-e937-4c91-937b-a7ca7132f387		2023-09-10 21:18:08	2023-09-10 21:18:08	<p>Hi,</p>\n<p>Let me check on this.</p>\n<p>Get back to you ASAP.</p>	<PUZPR04MB67955087CD3E70E33EE2C9E0AFF3A@PUZPR04MB6795.apcprd04.prod.outlook.com>	<s9eb9df6e-53d7-4d22-be58-1a091526f2c6@magit.sg>	
9a19b45d-38f4-4b1a-a9ab-9b6b0d6c3874	23090003	t	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	9a19a4b5-e937-4c91-937b-a7ca7132f387		2023-09-10 21:18:28	2023-09-10 21:18:28	<p>office no internet, onsite standby</p>	s9eb9df6e-53d7-4d22-be58-1a091526f2c6@magit.sg	<sbf83b075-0b3e-4d22-b0ba-7bb14b4c24a9@magit.sg>	
9a19b530-3da0-433e-b053-d35700535574	23090004	f	App\\Models\\Customer	9a19a4b5-e937-4c91-937b-a7ca7132f387	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-09-10 21:20:46	2023-09-10 21:20:46	<html>\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">\n<style type="text/css" style="display:none;"> P {margin-top:0;margin-bottom:0;} </style>\n</head>\n<body dir="ltr">\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\nHi,</div>\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\n<br>\n</div>\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\ni also got 1 laptop got no power, please help to check on it as well</div>\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\n<br>\n</div>\n</body>\n</html>		<PUZPR04MB6795C8BD1B5BAA15A88D135FAFF3A@PUZPR04MB6795.apcprd04.prod.outlook.com>	
9a19b548-48d6-41e2-9815-7a1945491ede	23090003	f	App\\Models\\Customer	9a19a4b5-e937-4c91-937b-a7ca7132f387	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4		2023-09-10 21:21:02	2023-09-10 21:21:02	<html>\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=us-ascii">\n<style type="text/css" style="display:none;"> P {margin-top:0;margin-bottom:0;} </style>\n</head>\n<body dir="ltr">\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\nHi</div>\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\n<br>\n</div>\n<div style="font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);" class="elementToProof">\nPlease be fast, this is really urgent.</div>\n<div id="appendonsend"></div>\n<hr style="display:inline-block;width:98%" tabindex="-1">\n<div id="divRplyFwdMsg" dir="ltr"><font face="Calibri, sans-serif" style="font-size:11pt" color="#000000"><b>From:</b> support - MAGIT &lt;support@magit.sg&gt;<br>\n<b>Sent:</b> Sunday, September 10, 2023 9:18 PM<br>\n<b>To:</b> david.wu121@hotmail.com &lt;david.wu121@hotmail.com&gt;<br>\n<b>Subject:</b> office no internet</font>\n<div>&nbsp;</div>\n</div>\n<div class="x_font-sans x_antialiased">\n<p>Hi,</p>\n<p>Let me check on this.</p>\n<p>Get back to you ASAP.</p>\n</div>\n</body>\n</html>	<s9eb9df6e-53d7-4d22-be58-1a091526f2c6@magit.sg>	<PUZPR04MB67958094FA39D965894B1AC7AFF3A@PUZPR04MB6795.apcprd04.prod.outlook.com>	
9a21e076-6a8f-4edb-b861-01491911d42f	23090003	t	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	App\\Models\\Customer	9a19a4b5-e937-4c91-937b-a7ca7132f387		2023-09-14 22:48:24	2023-09-14 22:48:24	A site visit was completed, with the attached details	<PUZPR04MB67958094FA39D965894B1AC7AFF3A@PUZPR04MB6795.apcprd04.prod.outlook.com>	<s986cace1-e98c-48b6-bdfd-6b56ed172525@magit.sg>	
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	2014_10_12_000000_create_users_table	1
2	2014_10_12_100000_create_password_resets_table	1
3	2019_08_19_000000_create_failed_jobs_table	1
4	2019_12_14_000001_create_personal_access_tokens_table	1
5	2023_05_08_135928_create_role_table	1
6	2023_05_08_141425_add_role_to_user	1
7	2023_05_08_142212_create_priorities_table	1
8	2023_05_08_142228_create_statuses_table	1
9	2023_05_08_142242_create_types_table	1
10	2023_05_09_142548_update_user_table_with_role	1
11	2023_05_10_134019_add_soft_delete_to_user	1
12	2023_05_19_072738_create_media_table	1
13	2023_05_24_075816_create_customers_table	1
14	2023_05_24_152255_modify_customer_table_columns	1
15	2023_05_25_152310_update_customer_table_id	1
16	2023_05_27_003014_add_soft_deleted_to_customers_table	1
17	2023_06_01_013000_fix_id_column_to_use_uuid_for_users_table	1
18	2023_06_02_023046_add_payload_columns_to_messages_table	1
19	2023_06_02_061107__add_email_columns_to_customer	1
20	2023_06_03_015755_create_email_templates_table	1
21	2023_06_07_143404_add_access_lvl_to_role_tables	1
22	2023_06_08_123654_create_jobs_table	1
23	2023_06_11_011622_add_reference_column_to_messages_table	1
24	2023_06_12_165149_add_closed_status	1
25	2023_06_13_002724_add_source_field_to_messages_table	1
26	2023_06_13_123052_add_unknown_customer_to_table	1
27	2023_06_21_155119_add_default_template_to_email_templates_table	1
28	2023_06_27_154802_create_notifications_table	1
29	2023_06_30_135328_create_admin_user	1
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, type, notifiable_type, notifiable_id, data, read_at, created_at, updated_at) FROM stdin;
6ae0f2a6-e9df-4d11-91a3-7cbc84a8bc2f	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23070001","time":"2023-07-01T14:30:06.020839Z","subject":"SPAM-MED:  Final test","new":true}	2023-07-01 22:30:39	2023-07-01 22:30:06	2023-07-01 22:30:06
29d22389-3f60-41b9-9ac3-aac354055e8c	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23070002","time":"2023-07-01T14:30:31.480462Z","subject":"SPAM-MED:  Final test","new":true}	2023-07-01 22:32:08	2023-07-01 22:30:31	2023-07-01 22:30:31
a91efdba-76ec-4b4f-904b-79fe3aa2ba34	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23070004","time":"2023-07-01T14:32:30.205456Z","subject":"This is not a spam","new":true}	2023-07-01 22:33:41	2023-07-01 22:32:30	2023-07-01 22:32:30
07840409-5a44-4ced-8a27-2f067c714281	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23070005","time":"2023-07-01T14:58:37.772635Z","subject":"Still got 2 request?","new":true}	2023-07-02 02:31:55	2023-07-01 22:58:37	2023-07-01 22:58:37
b34a1f18-e375-4536-9851-ea159488425c	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23070003","time":"2023-07-01T14:32:23.024686Z","subject":"This is not a spam","new":true}	2023-07-02 02:37:25	2023-07-01 22:32:23	2023-07-01 22:32:23
c3ce057d-e329-45a6-9826-e1c558b0a887	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23070006","time":"2023-07-01T18:35:13.723516Z","subject":"SPAM-MED:  Billing items","new":true}	2023-07-03 00:33:55	2023-07-02 02:35:13	2023-07-02 02:35:13
44e56928-c61f-4d13-b681-dda2843ee56d	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23070008","time":"2023-07-03T16:23:26.472317Z","subject":"laptop spoil","new":false}		2023-07-04 00:23:26	2023-07-04 00:23:26
7c9dccde-5c92-4813-b295-01df46290530	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23070008","time":"2023-07-03T16:15:25.326807Z","subject":"laptop spoil","new":true}	2023-07-04 23:17:40	2023-07-04 00:15:25	2023-07-04 00:15:25
ec4c90ce-0bcf-4443-85e8-538ddc1279c0	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23070009","time":"2023-07-08T10:40:38.838065Z","subject":"test 123","new":true}	2023-07-08 19:00:51	2023-07-08 18:40:38	2023-07-08 18:40:38
517da350-98f7-4ab2-b5c1-157d678839d4	App\otifications\ewMailNotification	App\\Models\\User	99990640-7fc0-4a36-85c3-0bd6917a99b7	{"ticket_id":"23070009","time":"2023-07-09T11:57:58.604753Z","subject":"test 123","new":false}	2023-07-09 21:08:53	2023-07-09 19:57:58	2023-07-09 19:57:58
364e5551-31c3-4ad0-a080-b9834e79f945	App\otifications\ewMailNotification	App\\Models\\User	99990640-7fc0-4a36-85c3-0bd6917a99b7	{"ticket_id":"23070009","time":"2023-07-09T13:10:07.514830Z","subject":"test 123","new":false}		2023-07-09 21:10:07	2023-07-09 21:10:07
b70d234a-a22e-45cb-b291-befdd642860b	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23070007","time":"2023-07-01T18:37:14.485382Z","subject":"SPAM-MED:  I am just testing the functionality","new":true}	2023-09-10 17:02:55	2023-07-02 02:37:14	2023-07-02 02:37:14
67d73148-2abb-4696-98e1-8157c8544ac3	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23090001","time":"2023-09-10T10:32:30.570242Z","subject":"Test 2","new":true}		2023-09-10 18:32:30	2023-09-10 18:32:30
0d719897-48fc-4e5b-8714-804baaa7e2fe	App\otifications\ewMailNotification	App\\Models\\User	99990640-7fc0-4a36-85c3-0bd6917a99b7	{"ticket_id":"23090001","time":"2023-09-10T10:32:30.579279Z","subject":"Test 2","new":true}		2023-09-10 18:32:30	2023-09-10 18:32:30
089b6e08-3c49-4168-966d-059ae7fe7307	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23090002","time":"2023-09-10T10:34:30.853498Z","subject":"Test 2","new":true}		2023-09-10 18:34:30	2023-09-10 18:34:30
251dd7cd-201c-4d0b-8f67-d017f3163236	App\otifications\ewMailNotification	App\\Models\\User	99990640-7fc0-4a36-85c3-0bd6917a99b7	{"ticket_id":"23090002","time":"2023-09-10T10:34:30.861267Z","subject":"Test 2","new":true}		2023-09-10 18:34:30	2023-09-10 18:34:30
79c74ead-c115-4e63-9495-a0133f4ba0ef	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23090003","time":"2023-09-10T12:34:42.482026Z","subject":"office no internet","new":true}		2023-09-10 20:34:42	2023-09-10 20:34:42
9a01c6c9-d927-4a9f-93bd-4ad0838241ff	App\otifications\ewMailNotification	App\\Models\\User	99990640-7fc0-4a36-85c3-0bd6917a99b7	{"ticket_id":"23090003","time":"2023-09-10T12:34:42.488222Z","subject":"office no internet","new":true}		2023-09-10 20:34:42	2023-09-10 20:34:42
cbc84d82-9115-48a7-b246-9ce05843a44b	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23090004","time":"2023-09-10T13:20:46.996935Z","subject":"laptop no power","new":true}		2023-09-10 21:20:46	2023-09-10 21:20:46
85a530c7-3ba5-440c-8db1-8e2f5d9b0d84	App\otifications\ewMailNotification	App\\Models\\User	99990640-7fc0-4a36-85c3-0bd6917a99b7	{"ticket_id":"23090004","time":"2023-09-10T13:20:47.017093Z","subject":"laptop no power","new":true}		2023-09-10 21:20:47	2023-09-10 21:20:47
e2ae01f3-619c-4ace-9f26-2e90237734f2	App\otifications\ewMailNotification	App\\Models\\User	9950c600-ee08-42d2-9e4c-5a1785ff16a4	{"ticket_id":"23090003","time":"2023-09-10T13:21:02.761552Z","subject":"office no internet","new":false}		2023-09-10 21:21:02	2023-09-10 21:21:02
\.


--
-- Data for Name: password_resets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.password_resets (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: priority; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.priority (priority_id, name, description, created_at, updated_at) FROM stdin;
1	High	High priority		
2	Medium	Medium priority		
3	Low	Low priority		
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (role_id, name, description, created_at, updated_at, access_lvl) FROM stdin;
1	Admin	Can manage all settings and users		2023-07-01 22:25:22	4
2	Agent	Can manage all tickets		2023-07-01 22:25:22	3
\.


--
-- Data for Name: status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status (status_id, name, description, created_at, updated_at) FROM stdin;
1	OPEN	Ticket Open		
2	PENDING	Ticket Pending		
3	SOLVED	Ticket Solved		
4	DELETED	Ticket Deleted		
5	CLOSED		2023-07-01 22:25:22	2023-07-01 22:25:22
\.


--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (ticket_id, requestor_id, assignee_id, priority_id, status_id, type_id, subject, deleted_at, created_at, updated_at, latest_reference) FROM stdin;
23070002	998afa1a-ca46-4315-87e9-429d19214393		3	1		SPAM-MED:  Final test		2023-07-01 22:30:31	2023-07-01 22:30:31	<A39A1CC8-9C2E-421D-A3EB-61C651788D87@hxcore.ol>
23070004	998afaeb-da23-4546-8a9e-10b34bb387e2		3	1		This is not a spam		2023-07-01 22:32:30	2023-07-01 22:32:30	<PAXP251MB0672CF497F008B03BA67D238B52BA@PAXP251MB0672.EURP251.PROD.OUTLOOK.COM>
23070001	998afa1a-ca46-4315-87e9-429d19214393	9950c600-ee08-42d2-9e4c-5a1785ff16a4	3	5	3	SPAM-MED:  Final test		2023-07-01 22:30:05	2023-07-01 23:01:20	se2ad26d1-d5eb-4c87-96de-7f35151bfdf8@magit.sg
23070006	998b03a1-4436-49b1-a7c4-d46cc8a63138		3	1		SPAM-MED:  Billing items		2023-07-02 02:35:13	2023-07-02 02:35:13	<2D088254-0875-4585-AA90-FE7C40451C5E@hxcore.ol>
23070005	998afaeb-da23-4546-8a9e-10b34bb387e2		3	1		Still got 2 request?		2023-07-01 22:58:37	2023-07-02 02:36:03	sb7010842-c187-4886-a173-80d78193855e@magit.sg
23070007	998b03a1-4436-49b1-a7c4-d46cc8a63138		3	1		SPAM-MED:  I am just testing the functionality		2023-07-02 02:37:14	2023-07-02 02:37:14	<C58431F4-786A-403E-B828-4A52B9DBB4B0@hxcore.ol>
23070003	998afaeb-da23-4546-8a9e-10b34bb387e2	9950c600-ee08-42d2-9e4c-5a1785ff16a4	3	1		This is not a spam		2023-07-01 22:32:22	2023-07-02 02:37:31	<PAXP251MB0672CF497F008B03BA67D238B52BA@PAXP251MB0672.EURP251.PROD.OUTLOOK.COM>
23090003	9a19a4b5-e937-4c91-937b-a7ca7132f387	9950c600-ee08-42d2-9e4c-5a1785ff16a4	1	5	4	office no internet		2023-09-10 20:34:42	2023-09-14 22:46:40	<PUZPR04MB67958094FA39D965894B1AC7AFF3A@PUZPR04MB6795.apcprd04.prod.outlook.com>
23070008	998f25bd-287b-4f4c-bc39-d8a3872f22af	99990640-7fc0-4a36-85c3-0bd6917a99b7	2	5	3	laptop spoil		2023-07-04 00:15:25	2023-07-08 22:11:10	s21622e6f-9596-46e0-9838-2f4cf9e488ee@magit.sg
23070009	9998bcef-4daf-4b3d-a202-bf28ea7cf9b1	99990640-7fc0-4a36-85c3-0bd6917a99b7	3	2	3	test 123		2023-07-08 18:40:38	2023-07-09 23:42:29	sd5dea840-2803-4b09-ab1a-f6bf1bfdd881@magit.sg
23090002	998afa1a-ca46-4315-87e9-429d19214393		3	1		Test 2		2023-09-10 18:34:30	2023-09-10 18:34:30	<97677D06-FDA6-4374-9E7B-1C85F4A82BBB@hxcore.ol>
23090001	998afa1a-ca46-4315-87e9-429d19214393		3	1		Test 2		2023-09-10 18:32:30	2023-09-10 18:40:31	<5CAF4F30-8A7D-441B-A1B8-B658446D63EF@hxcore.ol>
23090004	9a19a4b5-e937-4c91-937b-a7ca7132f387		3	1		laptop no power		2023-09-10 21:20:46	2023-09-10 21:20:46	<PUZPR04MB6795C8BD1B5BAA15A88D135FAFF3A@PUZPR04MB6795.apcprd04.prod.outlook.com>
\.


--
-- Data for Name: type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.type (type_id, name, description, created_at, updated_at) FROM stdin;
1	Maintenance			
2	Sales			
3	Reporting			
4	Job Order		2023-09-10 16:45:18	2023-09-10 16:45:18
5	Service Order		2023-09-10 16:45:29	2023-09-10 16:45:29
6	Outsource Manpower		2023-09-10 16:45:39	2023-09-10 16:45:39
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, email_verified_at, password, role_id, remember_token, deleted_at, created_at, updated_at) FROM stdin;
9950c600-ee08-42d2-9e4c-5a1785ff16a4	Admin	admin@gmail.com		$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi	1				
99990640-7fc0-4a36-85c3-0bd6917a99b7	Vincent	vincent@magit.sg		$2y$10$CrE9AAr5yUEMQfqZztBynOVIcMui8TQWeTMpBeSn4zbfxyiadCxum	2			2023-07-08 22:05:39	2023-07-08 22:05:39
\.


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.jobs_id_seq', 61, true);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_id_seq', 3, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 29, true);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);


--
-- Name: priority_priority_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.priority_priority_id_seq', 3, true);


--
-- Name: role_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_role_id_seq', 2, true);


--
-- Name: status_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_status_id_seq', 5, true);


--
-- Name: type_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.type_type_id_seq', 6, true);


--
-- Name: customers customer_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customer_email UNIQUE (email);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);


--
-- Name: email_templates email_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.email_templates
    ADD CONSTRAINT email_templates_pkey PRIMARY KEY (template_id);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: media media_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_uuid_unique UNIQUE (uuid);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: password_resets password_resets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_resets
    ADD CONSTRAINT password_resets_pkey PRIMARY KEY (email);


--
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- Name: priority priority_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.priority
    ADD CONSTRAINT priority_pkey PRIMARY KEY (priority_id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (role_id);


--
-- Name: status status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status
    ADD CONSTRAINT status_pkey PRIMARY KEY (status_id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (ticket_id);


--
-- Name: type type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.type
    ADD CONSTRAINT type_pkey PRIMARY KEY (type_id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: customers_company_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX customers_company_index ON public.customers USING btree (company);


--
-- Name: customers_mobile_number_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX customers_mobile_number_index ON public.customers USING btree (mobile_number);


--
-- Name: customers_phone_number_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX customers_phone_number_index ON public.customers USING btree (phone_number);


--
-- Name: customers_pic_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX customers_pic_name_index ON public.customers USING btree (pic_name);


--
-- Name: email_templates_default_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX email_templates_default_index ON public.email_templates USING btree ("default");


--
-- Name: email_templates_template_name_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX email_templates_template_name_index ON public.email_templates USING btree (template_name);


--
-- Name: jobs_queue_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX jobs_queue_index ON public.jobs USING btree (queue);


--
-- Name: media_model_type_model_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_model_type_model_id_index ON public.media USING btree (model_type, model_id);


--
-- Name: media_order_column_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX media_order_column_index ON public.media USING btree (order_column);


--
-- Name: messages_in_reply_to_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX messages_in_reply_to_index ON public.messages USING btree (in_reply_to);


--
-- Name: messages_messageid_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX messages_messageid_index ON public.messages USING btree ("messageId");


--
-- Name: messages_recipient_type_recipient_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX messages_recipient_type_recipient_id_index ON public.messages USING btree (recipient_type, recipient_id);


--
-- Name: messages_sender_type_sender_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX messages_sender_type_sender_id_index ON public.messages USING btree (sender_type, sender_id);


--
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- Name: tickets_latest_reference_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tickets_latest_reference_index ON public.tickets USING btree (latest_reference);


--
-- Name: tickets_subject_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX tickets_subject_index ON public.tickets USING btree (subject);


--
-- Name: messages messages_ticket_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_ticket_id_foreign FOREIGN KEY (ticket_id) REFERENCES public.tickets(ticket_id);


--
-- Name: tickets tickets_assignee_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_assignee_id_foreign FOREIGN KEY (assignee_id) REFERENCES public.users(id);


--
-- Name: tickets tickets_priority_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_priority_id_foreign FOREIGN KEY (priority_id) REFERENCES public.priority(priority_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: tickets tickets_requestor_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_requestor_id_foreign FOREIGN KEY (requestor_id) REFERENCES public.customers(customer_id);


--
-- Name: tickets tickets_status_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_status_id_foreign FOREIGN KEY (status_id) REFERENCES public.status(status_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: tickets tickets_type_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_type_id_foreign FOREIGN KEY (type_id) REFERENCES public.type(type_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: users users_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.role(role_id);


--
-- PostgreSQL database dump complete
--

