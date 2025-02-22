let sessions = [];  

export const getAllSessions = () => sessions;

export const getSessionById = (id) => {
    return sessions.find(session => session.session_id === id);
};

export const createSession = (type, duration) => {
    const newSession = {
        session_id: Date.now().toString(),
        type,
        duration,
        completed: false,
        start_time: new Date().toISOString(),
        end_time: null
    };
    sessions.push(newSession);
    return newSession;
};

export const updateSession = (id) => {
    const session = sessions.find(session => session.session_id === id);
    if (session) {
        session.completed = true;
        session.end_time = new Date().toISOString();
    }
    return session;
};

export const deleteSession = (id) => {
    sessions = sessions.filter(session => session.session_id !== id);
};
