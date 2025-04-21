describe('Add Notes', () => {
  /**
   * Test Case 1: Skip the Tutorial Screen
   *
   * This test taps on the "Skip" button to bypass any intro/tutorial screens
   * and then verifies that the "Add note" element is displayed.
   */
//   it('Skip tutorial', async () => {
//     // Locate the skip button using its resource id and click it
//     const skipButton = await driver.$('id:com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip');
//     await skipButton.click();

//     // Verify that the "Add note" button appears after skipping the tutorial
//     const addNoteButton = await $('//*[@text="Add note"]');
//     await expect(addNoteButton).toBeDisplayed();
//   });

  /**
   * Test Case 2: Add a Note and Verify its Content
   *
   * This test simulates the following actions:
   * - Tapping the "Add note" button.
   * - Choosing the "Text" note type.
   * - Verifying that the editing screen is displayed.
   * - Adding a title and note body.
   * - Navigating back to save the note.
   * - Asserting that both the edit button (for confirming a successful save)
   *   and the note content are visible.
   */
//   it('Add a note, save changes & verify note', async () => {
//     // Tap the "Add note" button to start creating a new note
//     const addNoteButton = await $('//*[@text="Add note"]');
//     await addNoteButton.click();

//     // Select the "Text" note option
//     const textNoteOption = await $('//*[@text="Text"]');
//     await textNoteOption.click();

//     // Verify that the editing screen is displayed by checking for an "Editing" indicator
//     const editingIndicator = await $('//*[@text="Editing"]');
//     await expect(editingIndicator).toBeDisplayed();

//     // Add a title for the note
//     const titleField = await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]');
//     await titleField.addValue('Fav Anime List');

//     // Add the note content with multiple lines
//     const noteField = await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_note"]');
//     await noteField.addValue('Naruto\nOnePiece\nAOT');

//     // Save the note by simulating two back actions (this might vary based on your app flow)
//     await driver.back();
//     await driver.back();

//     // Verify that the edit button is displayed (indicating the note is saved and editable)
//     const editButton = await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_btn"]');
//     await expect(editButton).toBeDisplayed();

//     // Confirm that the note’s content matches what was entered by asserting the note view text
//     const noteView = await $('//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/view_note"]');
//     await expect(noteView).toHaveText('Naruto\nOnePiece\nAOT');
//   });

  it('should open Chrome and search for nodejs', async () => {
    // Navigate to Google
    await driver.url('https://www.google.com');

    // Optional: Handle the "I agree" or privacy terms popup if it appears
    const agreeButton = await $('button=I agree');
    if (await agreeButton.isDisplayed()) {
      await agreeButton.click();
    }

    // Locate the search input field (Google's search bar)
    const searchInput = await $('input[name="q"]');
    await searchInput.waitForDisplayed({ timeout: 10000 });

    // Enter the search query "nodejs" followed by a newline to simulate pressing Enter
    await searchInput.setValue('nodejs\n');

    // Wait for the search results to appear; here we check for any result header
    const firstResultHeader = await $('//h3');
    await firstResultHeader.waitForDisplayed({ timeout: 10000 });

    // Optionally, assert that the first result header contains "Node.js"
    const headerText = await firstResultHeader.getText();
    expect(headerText).toContain('Node.js');
  });
});
