test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });
  
let noteId;

const SERVER_URL = "http://localhost:4000";

test("/postNote - Post a note", async () => {
  const title = "NoteTitleTest";
  const content = "NoteTitleContent";

  const postNoteRes = await fetch(`${SERVER_URL}/postNote`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          title: title,
          content: content,
      }),
  });

  const postNoteBody = await postNoteRes.json();
  noteId = postNoteBody.insertedId; // Corrected from postResponseBody.id to postNoteBody.insertedId
  expect(postNoteRes.status).toBe(200);
  expect(postNoteBody.response).toBe("Note added succesfully.");
});



test("/getAllNotes - Return list of all notes", async () => {
    const response = await fetch(`${SERVER_URL}/getAllNotes`);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    // Make sure to expect the correct structure based on your API's response
    expect(Array.isArray(responseBody.response)).toBe(true); // Assuming the response is wrapped in { response: [] }
});




// Corrected deleteNote test using the obtained ID
/*
test("/deleteNote - Delete a note using the obtained ID", async () => {
    const deleteResponse = await fetch(`${SERVER_URL}/deleteNote/${noteId}`, {
        method: "GET",
    });
    const deleteResponseBody = await deleteResponse.json();

    expect(deleteResponse.status).toBe(200);
});
let noteIdd*/

test("/patchNote - Patch with content and title", async () => {
    
    const response = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "New Title", content: "New Content" }),
    });
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.response).toBe(`Document with ID ${noteId} patched.`);
});





  

test("/patchNote - Patch with just title", async () => {
    // Assuming noteId is defined and valid
    const response = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Title Only" }),
    });
    const result = await response.json();
    
    expect(response.status).toBe(200);
  });
  

test("/patchNote - Patch with just content", async () => {
    // Assuming noteId is defined and valid
    const response = await fetch(`${SERVER_URL}/patchNote/${noteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: "New Content Only" }),
    });
    const result = await response.json();

    expect(response.status).toBe(200);
});
  

test("/deleteAllNotes - Delete one note", async () => {
    // Ensure there is exactly one note in the database before this test
    const response = await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
    const result = await response.json();
    
    expect(response.status).toBe(200);
});

test("/deleteAllNotes - Delete three notes", async () => {
    const response = await fetch(`${SERVER_URL}/deleteAllNotes`, { method: "DELETE" });
    const result = await response.json();

    expect(response.status).toBe(200);
});
  
test("/updateNoteColor - Update color of a note to red (#FF0000)", async () => {
    const response = await fetch(`${SERVER_URL}/updateNoteColor/${noteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ color: "#FF0000" }),
    });
    const responseBody = await response.json();

    expect(response.status).toBe(200);
});


test("1+2=3, empty array is empty", () => {
    expect(1 + 2).toBe(3);
    expect([].length).toBe(0);
  });