import React from "react";
import ProfileForm from "./ProfileForm";
import UserSavedContent from "./UserSavedContent";

/** Handles user profile information update
 *  - Pulls user data from currUser state to populate form.
 *  - Requires password input to verify submission
 *  - Updates user info across site state.
 */
function Profile({ logout }) {
  return (
    <div className="ProfileForm bg-light p-4 w-100 shadow rounded">
      <UserSavedContent />
      <ProfileForm logout={logout} />
    </div>
  );
}

export default Profile;
