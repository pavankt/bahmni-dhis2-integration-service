INSERT INTO mapping (mapping_name, lookup_table, mapping_json, created_by, date_created) VALUES ('HTS Service','{"instance":"HTS_Instance","enrollment":"HTS_Enrollment","instance":"HTS_Event"}','{"instance" : {"First Name" : "ZtnSKh7UQTV","Last Name" : "adBbi66uP8B"},"programs" : { "HTS": "z5ACp4j2s0P", "HTS stage": "BImiyz0dmkI", "orgUnit": "kChtoX6lUMN"},"enrollents" : { "Have TB" : "abFL60KXhXk", "HIV Self Test" : "QjPBRXZisYv", "Need counseling" : "YvkWbpS3D8d"}}','admin','02/15/2018');
INSERT INTO mapping (mapping_name, lookup_table, mapping_json, created_by, date_created) VALUES ('TB Service','{"instance":"TB_Instance"}','{"instance" : { "First Name" : "ZtnSKh7UQTV","Last Name" : "adBbi66uP8B"}}','admin','02/15/2018');

INSERT INTO marker (program_name, category, last_synced_date) VALUES ('HTS Service', 'instance', null);
INSERT INTO marker (program_name, category, last_synced_date) VALUES ('HTS Service', 'enrollment', null);
INSERT INTO marker (program_name, category, last_synced_date) VALUES ('HTS Service', 'events', null);

INSERT INTO marker (program_name, category, last_synced_date) VALUES ('TB Service', 'instance', null);
INSERT INTO marker (program_name, category, last_synced_date) VALUES ('TB Service', 'enrollment', null);
INSERT INTO marker (program_name, category, last_synced_date) VALUES ('TB Service', 'events', null);