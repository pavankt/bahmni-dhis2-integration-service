Select coalesce( instanceTable."Patient_Identifier",  programEnrollmentsTable."Patient_Identifier",
                 eventsTable."Patient_Identifier")                                                   as "Patient Identifier",
       (Select orgunit from orgunit_tracker where orgunit = coalesce( instanceTable."OrgUnit",  programEnrollmentsTable."OrgUnit",  eventsTable."OrgUnit") )as "Org Unit",
       instanceTable.date_created as "Instance Date Created",
       %s,
        programEnrollmentsTable.enrollment_date "Enrollment Date",
        programEnrollmentsTable.incident_date "Incident Date",
        programEnrollmentsTable.status "Enrollment Status",
        programEnrollmentsTable.date_created as "Prog Enrollment Date Created",
        eventsTable.event_date "Event Date",
        eventsTable.program "Program",
        eventsTable.program_stage "Program Stage",
        eventsTable.program_start_date "Enrollment Date",
        eventsTable.status "Event Status",
        eventsTable.date_created as "Event Date Created",
       %s
from (Select pi.*
      from %s pi
             inner join marker m on pi.date_created > coalesce(m.last_synced_date, '-infinity')
                                      and category = 'instance' AND program_name =  '%s') as  instanceTable FULL
       OUTER JOIN (Select prog.*
                   from %s prog
                          inner join marker m on prog.date_created > coalesce(m.last_synced_date, '-infinity')
                                                   and category = 'enrollments' AND
                                                 program_name =  '%s') as  programEnrollmentsTable
         On  instanceTable."Patient_Identifier" =  programEnrollmentsTable."Patient_Identifier" FULL
       OUTER JOIN (Select event.*
                   from %s event
                          inner join marker m on event.date_created > coalesce(m.last_synced_date, '-infinity')
                                                   and category = 'event' AND
                                                 program_name =  '%s') as  eventsTable
         on  instanceTable."Patient_Identifier" =  eventsTable."Patient_Identifier"
order by  eventsTable.date_created,  programEnrollmentsTable.date_created,  instanceTable.date_created