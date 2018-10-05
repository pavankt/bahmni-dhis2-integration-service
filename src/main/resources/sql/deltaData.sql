Select coalesce( instanceTable."Patient_Identifier",  programEnrollmentsTable."Patient_Identifier",
                 eventsTable."Patient_Identifier")                                                   as identifier,
       coalesce( instanceTable."OrgUnit",  programEnrollmentsTable."OrgUnit",  eventsTable."OrgUnit") as Org,
       %s,
        programEnrollmentsTable.enrollment_date,
        programEnrollmentsTable.incident_date,
        programEnrollmentsTable.status enrollment_status,
        eventsTable.event_date,
       %s,
        eventsTable.program_start_date,
        eventsTable.status event_status
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