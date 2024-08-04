#fomo-assignment

NodeJs Version : 18.19.0

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine using Git. Open a terminal and run the following command:

```bash
git clone <repository_url>
```

### 2. Navigate to the Project Directory

```bash
cd fomo-assignment-backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Environment Variables

Create a .env file in the root directory of your project and add the necessary environment variables. Here is an example of what your .env file might look like:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
PORT=4002
```

### 5. Start the Server

```bash
npm start
```
