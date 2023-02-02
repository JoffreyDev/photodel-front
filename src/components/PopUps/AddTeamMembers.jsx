import { MuiModal } from "..";
import React from "react";
import { Checkbox, TeamProfileCardToAdd, GreenButton } from "..";
import Shape from "../../img/addModules/shape.svg";

const AddTeamMembers = ({
  userTeamMembers,
  setMembersToDisplay,
  modalActive,
  setModalActive,
  selectedMembers,
  setSelectedMembers,
}) => {
  return (
    <MuiModal open={modalActive} setOpen={setModalActive}>
      <div
        className={
          modalActive
            ? "edit_album_popup_wrapper active"
            : "edit_album_popup_wrapper"
        }
        onClick={() => setModalActive(false)}
      >
        <div
          className={
            modalActive
              ? "edit_album_popup_content team active"
              : "edit_album_popup_content team"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <div className="edit_album_popup_content_header">
            <p className="edit_album_popup_content_header_title">
              Добавить команду
            </p>
            <img
              src={Shape}
              alt="shape"
              className="edit_album_popup_content_header_shape"
              onClick={() => setModalActive(false)}
            />
          </div>
          <div className="edit_album_popup_content_info">
            <div
              className="edit_album_popup_content_info_left"
              style={{ marginBottom: "20px" }}
            >
              <p className="edit_album_popup_content_info_left_p">
                Всего:{" "}
                <span className="edit_album_popup_content_info_left_p_span">
                  {userTeamMembers && userTeamMembers.length}
                </span>
              </p>
              {/*  <p className="edit_album_popup_content_info_left_p">
                Выбрано:{" "}
                <span className="edit_album_popup_content_info_left_p_span">
                  {selectedMembers ? selectedMembers.length : 0}
                </span>
              </p> */}
            </div>
            {/*  <Checkbox
              label={"Выбрать все"}
              callback={() => {
                if (allMembersSelected) {
                  setSelectedMembers([]);
                  setAllMembersSelected(false);
                } else {
                  userTeamMembers.forEach((member) => array.push(member.id));
                  setSelectedMembers(array);
                  setAllMembersSelected(true);
                }
              }}
              value={allMembersSelected}
            /> */}
          </div>
          <div className="edit_album_popup_content_cards team">
            {userTeamMembers &&
              userTeamMembers.map((member, idx) => (
                <TeamProfileCardToAdd
                  profile={member}
                  key={idx}
                  disableRedirect
                  disableEdit
                  array={selectedMembers}
                  callback={setSelectedMembers}
                />
              ))}
          </div>
          <div className="edit_album_popup_content_button">
            <GreenButton
              text={"Добавить"}
              width={"180px"}
              height={"38px"}
              callback={() => {
                setMembersToDisplay(selectedMembers);

                setModalActive(false);
              }}
            />
          </div>
        </div>
      </div>
    </MuiModal>
  );
};

export default AddTeamMembers;
