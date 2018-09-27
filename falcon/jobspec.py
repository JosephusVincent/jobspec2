# things.py
import falcon
import couchdb
import json
import jwt
# from deepdiff import DeepDiff
import difflib
from pprint import pprint
import re
# Falcon follows the REST architectural style, meaning (among
# other things) that you think in terms of resources and state
# transitions, which map to HTTP verbs.


# Retrieve Data
class ThingsResource:
    def on_get(self, req, resp):
        s = couchdb.Server('http://replication:r2d2rep@localhost:5984')
        db = s['task1']
        result=[]
        for r in db.view('countdoc/countview'):
            result.append(r.value)
        resp.media=result


# Authentication
class authJWT:
    def on_post(self, req, resp):
        token = req.media
        # print authData
        # print (token)
        decode = jwt.decode(token, verify=False)
        print ("Login Successfully")
        resp.media = decode


#Creates New Documents
class createResource:
    def on_post(self, req, resp):
        import datetime
        date = datetime.datetime.now()
        datenow = [date.year,date.month,date.day,date.hour,date.minute,date.second]
        s = couchdb.Server('http://replication:r2d2rep@localhost:5984')
        db = s['task1']
        data = req.media
        history = {"created_by":"Admin", "date_created":datenow}
        data["history"].insert(0,history)
        # print data
        add_doc = {}
        newdoc_id = 0 
        num_doc = 0
        for docu in db.view('countdoc/countview'):
            num_doc = num_doc+1
        newdoc_id = str(num_doc+1)
        add_doc.update({'_id':newdoc_id})
        add_doc.update(data)
        db.save(add_doc)
        print ("Successfully added a job Ad")


# Archive Document
class viewsArchive:
    def on_get(self, req, resp):
        s = couchdb.Server('http://replication:r2d2rep@localhost:5984')
        db = s['task1']
        result = []
        for r in db.view('archive_design/archive_view'):
            result.append(r.value)
        resp.media = result
        print ("Archive has been retrieved.")


# Active/New Document
class viewsActiveNew:
    def on_get(self, req, resp):
        s = couchdb.Server('http://replication:r2d2rep@localhost:5984')
        db = s['task1']
        result=[]
        for r in db.view('design_archive/view_archive'):
            result.append(r.value)
        print ("Document retrieved!")
        resp.media=result
        

# Update Document
# Get ID Then Return Result to Javascript
class SelectedData:
    def on_get(self, req, resp, doc_id):
        print (doc_id)
        s = couchdb.Server('http://replication:r2d2rep@localhost:5984')
        db = s['task1']
        doc_id = doc_id
        doc = db[doc_id]
        # print (doc)
        resp.media = doc

class Updatedoc:
    def on_post(self, req, resp):
        import datetime
        date = datetime.datetime.now()
        datenow = [date.year,date.month,date.day,date.hour,date.minute,date.second]
        s = couchdb.Server('http://replication:r2d2rep@localhost:5984')
        db = s['task1']
        doc_new = req.media
        doc_old = db.get(doc_new["_id"])
##########Creates the History logs for all the input fields############################
        if doc_old["ad_job_or_title"]!= doc_new["ad_job_or_title"]:
            log={
                    "change":"-ad_job_or_title:"+doc_old["ad_job_or_title"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+ad_job_or_title:"+doc_new["ad_job_or_title"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["leads_or_client"]!= doc_new["leads_or_client"]:
            log={
                    "change":"-leads_or_client:"+doc_old["leads_or_client"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+leads_or_client:"+doc_new["leads_or_client"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["job_position"]!= doc_new["job_position"]:
            log={
                    "change":"-job_position:"+doc_old["job_position"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+job_position:"+doc_new["job_position"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["category"]!= doc_new["category"]:
            log={
                    "change":"-category:"+doc_old["category"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+category:"+doc_new["category"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["classification"]!= doc_new["classification"]:
            log={
                    "change":"-classification:"+doc_old["classification"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+classification:"+doc_new["classification"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["out_sourcing_model"]!= doc_new["out_sourcing_model"]:
            log={
                    "change":"-out_sourcing_model:"+doc_old["out_sourcing_model"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+out_sourcing_model:"+doc_new["out_sourcing_model"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["company"]!= doc_new["company"]:
            log={
                    "change":"-company:"+doc_old["company"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+company:"+doc_new["company"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["heading"]!= doc_new["heading"]:
            log={
                    "change":"-heading:"+doc_old["heading"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+heading:"+doc_new["heading"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["status"]!= doc_new["status"]:
            log={
                    "change":"-status:"+doc_old["status"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+status:"+doc_new["status"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["show_status"]!= doc_new["show_status"]:
            log={
                    "change":"-show_status:"+doc_old["show_status"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+show_status:"+doc_new["show_status"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["job_position"]!= doc_new["job_position"]:
            log={
                    "change":"-job_position:"+doc_old["job_position"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+job_position:"+doc_new["job_position"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["quantity"]!= doc_new["quantity"]:
            log={
                    "change":"-quantity:"+doc_old["quantity"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+quantity:"+doc_new["quantity"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["level"]!= doc_new["level"]:
            log={
                    "change":"-level:"+doc_old["level"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+level:"+doc_new["level"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["currency"]!= doc_new["currency"]:
            log={
                    "change":"-currency:"+doc_old["currency"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+currency:"+doc_new["currency"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["work_status"]!= doc_new["work_status"]:
            log={
                    "change":"-work_status:"+doc_old["work_status"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+work_status:"+doc_new["work_status"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["work_time_zone"]!= doc_new["work_time_zone"]:
            log={
                    "change":"-work_time_zone:"+doc_old["work_time_zone"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+work_time_zone:"+doc_new["work_time_zone"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["work_start_time"]!= doc_new["work_start_time"]:
            log={
                    "change":"-work_start_time:"+json.dumps(doc_old["work_start_time"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+work_start_time:"+json.dumps(doc_new["work_start_time"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["work_end_time"]!= doc_new["work_end_time"]:
            log={
                    "change":"-work_end_time:"+json.dumps(doc_old["work_end_time"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+work_end_time:"+json.dumps(doc_new["work_end_time"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["questions_to_be_asked"]["first"]!= doc_new["questions_to_be_asked"]["first"]:
            log={
                    "change":"-questions_to_be_asked_first:"+(doc_old["questions_to_be_asked"]["first"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+questions_to_be_asked_first:"+(doc_new["questions_to_be_asked"]["first"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["questions_to_be_asked"]["second"]!= doc_new["questions_to_be_asked"]["second"]:
            log={
                    "change":"-questions_to_be_asked_second:"+doc_old["questions_to_be_asked"]["second"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+questions_to_be_asked_second:"+doc_new["questions_to_be_asked"]["second"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["questions_to_be_asked"]["third"]!= doc_new["questions_to_be_asked"]["third"]:
            log={
                    "change":"-questions_to_be_asked_third:"+doc_old["questions_to_be_asked"]["third"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+questions_to_be_asked_third:"+doc_new["questions_to_be_asked"]["third"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["will_you_provide_training"]!= doc_new["will_you_provide_training"]:
            log={
                    "change":"-will_you_provide_training:"+doc_old["will_you_provide_training"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+will_you_provide_training:"+doc_new["will_you_provide_training"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
########################################################################################
        if doc_old["will_the_staff_make_calls"]!= doc_new["will_the_staff_make_calls"]:
            log={
                    "change":"-will_the_staff_make_calls:"+doc_old["will_the_staff_make_calls"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+will_the_staff_make_calls:"+doc_new["will_the_staff_make_calls"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["is_this_your_first_staff_hire_for_the_job_role"]!= doc_new["is_this_your_first_staff_hire_for_the_job_role"]:
            log={
                    "change":"-is_this_your_first_staff_hire_for_the_job_role:"+doc_old["is_this_your_first_staff_hire_for_the_job_role"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+is_this_your_first_staff_hire_for_the_job_role:"+doc_new["is_this_your_first_staff_hire_for_the_job_role"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
########################################################################################
        if doc_old["will_the_staff_report_directly_to_you"]!= doc_new["will_the_staff_report_directly_to_you"]:
            log={
                    "change":"-will_the_staff_report_directly_to_you:"+doc_old["will_the_staff_report_directly_to_you"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+will_the_staff_report_directly_to_you:"+doc_new["will_the_staff_report_directly_to_you"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["manager_info"]["name"]!= doc_new["manager_info"]["name"]:
            log={
                    "change":"-manager_info.name:"+doc_old["manager_info"]["name"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+manager_info.name:"+doc_new["manager_info"]["name"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["manager_info"]["email"]!= doc_new["manager_info"]["email"]:
            log={
                    "change":"-manager_info.email:"+doc_old["manager_info"]["email"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+manager_info.email:"+doc_new["manager_info"]["email"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#######################################################################################
        if doc_old["manager_info"]["contact"]!= doc_new["manager_info"]["contact"]:
            log={
                    "change":"-manager_info.contact:"+json.dumps(doc_old["manager_info"]["contact"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+manager_info.contact:"+json.dumps(doc_new["manager_info"]["contact"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
######################################################################################
        if doc_old["start_date"]!= doc_new["start_date"]:
            log={
                    "change":"-start_date:"+doc_old["start_date"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+start_date:"+doc_new["start_date"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
 ####################################################################################
        if doc_old["requirements"]!= doc_new["requirements"]:
            log={
                    "change":"-requirements:"+json.dumps(doc_old["requirements"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+requirements:"+json.dumps(doc_new["requirements"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
# ##################################################################################
        if doc_old["requirements_must_have"]!= doc_new["requirements_must_have"]:
            log={
                    "change":"-requirements_must_have:"+json.dumps(doc_old["requirements_must_have"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+requirements_must_have:"+json.dumps(doc_new["requirements_must_have"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
# ##########################################################################################
        if doc_old["requirements_good_to_have"]!= doc_new["requirements_good_to_have"]:
            log={
                    "change":"-requirements_good_to_have:"+json.dumps(doc_old["requirements_good_to_have"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+requirements_good_to_have:"+json.dumps(doc_new["requirements_good_to_have"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
# ##########################################################################################
        if doc_old["required_tasks"]!= doc_new["required_tasks"]:
            log={
                    "change":"-required_tasks:"+json.dumps(doc_old["required_tasks"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+required_tasks:"+json.dumps(doc_new["required_tasks"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
# #########################################################################################
        if doc_old["required_skills"]!= doc_new["required_skills"]:
            log={
                    "change":"-required_skills:"+json.dumps(doc_old["required_skills"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+required_skills:"+json.dumps(doc_new["required_skills"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
# ###########################################################################################
        if doc_old["responsibilities"]!= doc_new["responsibilities"]:
            log={
                    "change":"-responsibilities:"+json.dumps(doc_old["responsibilities"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+responsibilities:"+json.dumps(doc_new["responsibilities"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
# ############################################################################################## 
        if doc_old["duties_and_responsibilities"]!= doc_new["duties_and_responsibilities"]:
            log={
                    "change":"-duties_and_responsibilities:"+json.dumps(doc_old["duties_and_responsibilities"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+duties_and_responsibilities:"+json.dumps(doc_new["duties_and_responsibilities"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
# ################################################################################################
        if doc_old["other_desired_preferred_skill"]!= doc_new["other_desired_preferred_skill"]:
            log={
                    "change":"-other_desired_preferred_skill:"+json.dumps(doc_old["other_desired_preferred_skill"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
            }
            doc_old["history"].insert(0,log)
            log={
                    "change":"+other_desired_preferred_skill:"+json.dumps(doc_new["other_desired_preferred_skill"])+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
            doc_old["history"].insert(0,log)
#####################################################################################################
            if doc_old["special_instructions"]!= doc_new["special_instructions"]:
                log={
                    "change":"-special_instructions:"+doc_old["special_instructions"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                }
                doc_old["history"].insert(0,log)
                log={
                    "change":"+special_instructions:"+doc_new["special_instructions"]+"",
                    "changed_by":"RemoteStaff",
                    "time_stamp":datenow
                    }
                doc_old["history"].insert(0,log)
        # doc_old["requirements"] = doc_new["requirements"]
        # doc_old["requirements_must_have"] = doc_new["requirements_must_have"]
        # doc_old["requirements_good_to_have"] = doc_new["requirements_good_to_have"]
        # doc_old["required_tasks"] = doc_new["required_tasks"]
        # doc_old["required_skills"] = doc_new["required_skills"]
        # doc_old["responsibilities"] = doc_new["responsibilities"]
        # doc_old["duties_and_responsibilities"] = doc_new["duties_and_responsibilities"]
        # doc_old["other_desired_preferred_skill"] = doc_new["other_desired_preferred_skill"]
        # doc_old["tell_more_about_job_role"] = doc_new["tell_more_about_job_role"]
############################################# This Updates the whole document ################################################
        doc_old.update({'ad_job_or_title':doc_new["ad_job_or_title"]})
        doc_old.update({'leads_or_client':doc_new["leads_or_client"]})
        doc_old.update({'job_position':doc_new["job_position"]})
        doc_old.update({'category':doc_new["category"]})
        doc_old.update({'classification':doc_new["classification"]})
        doc_old.update({'out_sourcing_model':doc_new["out_sourcing_model"]})
        doc_old.update({'company':doc_new["company"]})
        doc_old.update({'heading':doc_new["heading"]})
        doc_old.update({'status':doc_new["status"]})
        doc_old.update({'show_status':doc_new["show_status"]})
        doc_old.update({'job_position':doc_new["job_position"]})
        doc_old.update({'quantity':doc_new["quantity"]})
        doc_old.update({'level':doc_new["level"]})
        doc_old.update({'currency':doc_new["currency"]})
        doc_old.update({'work_status':doc_new["work_status"]})
        doc_old.update({'work_time_zone':doc_new["work_time_zone"]})
        doc_old.update({'work_start_time':doc_new["work_start_time"]})
        doc_old.update({'work_end_time':doc_new["work_end_time"]})
        doc_old.update({'questions_to_be_asked':doc_new["questions_to_be_asked"]})
        doc_old.update({'manager_info':doc_new["manager_info"]})
        doc_old.update({'will_you_provide_training':doc_new["will_you_provide_training"]})
        doc_old.update({'will_the_staff_make_calls':doc_new["will_the_staff_make_calls"]})
        doc_old.update({'is_this_your_first_staff_hire_for_the_job_role':doc_new["is_this_your_first_staff_hire_for_the_job_role"]})
        doc_old.update({'will_the_staff_report_directly_to_you':doc_new["will_the_staff_report_directly_to_you"]})
        doc_old.update({'start_date':doc_new["start_date"]})
        doc_old.update({'requirements':doc_new["requirements"]})
        doc_old.update({'requirements_must_have':doc_new["requirements_must_have"]})
        doc_old.update({'requirements_good_to_have':doc_new["requirements_good_to_have"]})
        doc_old.update({'required_tasks':doc_new["required_tasks"]})
        doc_old.update({'required_skills':doc_new["required_skills"]})
        doc_old.update({'responsibilities':doc_new["responsibilities"]})
        doc_old.update({'duties_and_responsibilities':doc_new["duties_and_responsibilities"]})
        doc_old.update({'other_desired_preferred_skill':doc_new["other_desired_preferred_skill"]})
        doc_old.update({'special_instructions':doc_new["special_instructions"]})
        db.save(doc_old)
        print("Succesfully Updated Document!")



app = falcon.API()

app.add_route('/falcon/things', ThingsResource())
app.add_route('/falcon/createDoc', createResource())
app.add_route('/falcon/getSelectedDatas/{doc_id}', SelectedData())
app.add_route('/falcon/viewArchive', viewsArchive())
app.add_route('/falcon/viewActiveNew', viewsActiveNew())
app.add_route('/falcon/update', Updatedoc())
app.add_route('/falcon/authData', authJWT())
