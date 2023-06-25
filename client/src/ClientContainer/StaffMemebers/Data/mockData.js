
import axios from 'axios'
export const mockDataContacts = async () => {
    try {
      const response = await axios.get('/issue/requested-issues', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      let Id = 1;
      const { requestedIssues } = response.data;
      const contacts = requestedIssues.map(issue => {
        const { _id, name, email, phoneNumber, issueDescription, createdAt,issueStatus } = issue;
        // const { filename, metadata } = issue.files[0];
        // const originalname = metadata.originalname;
        const files = issue.files.map(file => {
          return { filename: file.filename, originalname: file.metadata.originalname }
        });
        return {
          id: Id++,
          _id,
          name,
          issueStatus,
          email,
          phone: phoneNumber,
          issueDescription,
          createdAt: new Date(createdAt).toLocaleDateString('en-US'),
          files,
          // originalname // Add originalname property to the object
        };
      });
      return contacts;
    } catch (error) {
      alert(error?.response?.data?.msg + "Error while fetching user data");
      return [];
    }
  };

  