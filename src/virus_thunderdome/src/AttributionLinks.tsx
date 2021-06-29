import { IconButton, Modal } from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components/macro";

// shows on iconbutton click
export function AttributionLinks() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <AttributionLinksStyles>
      <BtnOpenModal
        {...{
          setOpen,
        }}
      />
      <Modal
        {...{
          open,
          onBackdropClick: handleClose,
          onEscapeKeyDown: handleClose,
          onClose: handleClose,
        }}
      >
        <ModalContentStyles>
          <div className="content">
            <div className="mediaItem">
              <div className="mediaType">Music</div>
              <div className="source">
                <a
                  href="https://www.traxsource.com/artist/587036/nopi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nõpi - Aqiral (Mixed)
                </a>
              </div>
            </div>

            <div className="mediaItem">
              <div className="mediaType">Code</div>
              <div className="source">
                <a
                  href="https://github.com/danielacorner/virus_thunderdome"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  danielacorner/virus_thunderdome
                </a>
              </div>
            </div>

            <div className="mediaItem">
              <div className="mediaType">Protein Data</div>
              <div className="source">
                <a
                  href="https://rcdsb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RCSB Protein DataBank
                </a>
              </div>
            </div>

            <div className="mediaItem">
              <div className="mediaType">3d Models</div>
              <div className="source">
                <a
                  href="https://www.cgl.ucsf.edu/chimerax/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UCSF ChimeraX
                </a>
              </div>
            </div>

            <div className="mediaItem">
              <div className="mediaType">Icons</div>
              <div className="source">
                <a href="https://www.freepik.com" title="Freepik">
                  Freepik
                </a>{" "}
                from{" "}
                <a href="https://www.flaticon.com/" title="Flaticon">
                  www.flaticon.com
                </a>
              </div>
            </div>
          </div>
        </ModalContentStyles>
      </Modal>
    </AttributionLinksStyles>
  );
}
const AttributionLinksStyles = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  .btnOpenModal {
  }
`;

const ModalContentStyles = styled.div`
  display: grid;
  place-items: center;
  width: 100vw;
  height: 100vh;
  .content {
    width: 75vw;
    height: 90vw;
    max-height: 600px;
    max-width: 600px;
  }
  .mediaItem {
    display: grid;
    grid-template-columns: 260px 300px;
    grid-gap: 2em;
    .mediaType {
      text-align: right;
    }
    .source {
      text-align: left;
    }
  }
`;

function BtnOpenModal({ setOpen }) {
  return (
    <IconButton className="btnOpenModal" onClick={() => setOpen(true)}>
      <GitHub />
    </IconButton>
  );
}
