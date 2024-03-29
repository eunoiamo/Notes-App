const endpoint = "https://notes-api.dicoding.dev/v2";
class ApiNotes {
  static getNotes = async () => {
    try {
      const response = await fetch(`${endpoint}/notes`);
      const result = await response.json();

      if (result.error) {
        throw new Error(`the API is not found`);
      } else {
        return result;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static insertNote = async (notes) => {
    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notes),
      };
      console.log(option);
      const response = await fetch(`${endpoint}/notes`, option);
      const result = await response.json();

      if (result.error) {
        throw new Error(`Cannot Add POST to API`);
      } else {
        return result.message;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  static archiveNote = async (noteId)=>{
    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(option);
      const response = await fetch(`${endpoint}/notes/${noteId}/archive`, option);
      const result = await response.json();
    
      if (result.error) {
        throw new Error(`Cannot Add POST to API`);
      } else {
        return result.message;
      }
      
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static restoreArchivedNote = async (noteId)=>{
    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log(option);
      const response = await fetch(`${endpoint}/notes/${noteId}/unarchive`, option);
      const result = await response.json();
    
      if (result.error) {
        throw new Error(`Cannot Add POST to API`);
      } else {
        return result.message;
      }
      
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static deleteNote = async (noteId) => {
    try {
      const response = await fetch(`${endpoint}/notes/${noteId}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.status === 200) {
        return result.message;
      } else {
        return result.message;
      }
    } catch (error) {
      return error;
    }
  };

  static getArchivedNotes = async () => {
    try {
      const response = await fetch(`${endpoint}/notes/archived`);
      const result = await response.json();

      if (result.error) {
        throw new Error(`the API is not found`);
      } else {
        return result;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default ApiNotes;
