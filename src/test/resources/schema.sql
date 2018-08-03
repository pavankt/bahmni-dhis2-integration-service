DROP TABLE IF EXISTS person_details_default CASCADE;
CREATE TABLE "public"."person_details_default" (
	"person_id" Integer,
	"person_name_id" Integer,
	"preferred" Text,
	"given_name" Text,
	"middle_name" Text,
	"family_name" Text,
	"gender" Text,
	"birthdate" Date,
	"birthtime" Time Without Time Zone,
	"birthdate_estimated" Text,
	"age" Text,
	"age_group" Text,
	"dead" Text,
	"death_date" Timestamp Without Time Zone,
	"deathdate_estimated" Text,
	"cause_of_death" Integer
);

DROP TABLE IF EXISTS patient_identifier CASCADE;
CREATE TABLE "public"."patient_identifier" (
	"patient_id" Integer NOT NULL,
	"OpenMRS_Identification_Number" Text,
	"Old_Identification_Number" Text,
	"Patient_Identifier" Text,
	"System_ID" Text,
	"UIC" Text,
	"PREP_OI_Identifier" Text,
	PRIMARY KEY ( "patient_id" )
);

DROP TABLE IF EXISTS mapping CASCADE;
CREATE TABLE "public"."mapping"(
  mapping_name text,
  program_name text,
  category text,
  lookup_table text,
  mapping_json json,
  created_by text,
  created_date date,
  modifed_by text,
  modifed_date date
);
