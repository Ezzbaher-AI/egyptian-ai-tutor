from app.services.curriculum_service import load_curriculum

def get_topic_content(grade: str, subject: str, topic: str):

    data = load_curriculum()

    try:
        return data[grade][subject]["semester_1"][topic]
    except:
        return None