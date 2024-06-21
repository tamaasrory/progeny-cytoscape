// src/Graph.js
import cytoscape from "cytoscape";
import contextMenus from "cytoscape-context-menus";
import "cytoscape-context-menus/cytoscape-context-menus.css";
import dagre from "cytoscape-dagre";
import React, { useEffect, useRef, useState } from "react";

// Memperkenalkan plugin ke Cytoscape
cytoscape.use(dagre);
cytoscape.use(contextMenus);

const Graph = () => {
  const cyRef = useRef(null);
  const [selectedNodeIds, setSelectedNodeIds] = useState([]);
  useEffect(() => {
    const savedZoom = parseFloat(localStorage.getItem("cyZoom"));
    const savedPan = JSON.parse(localStorage.getItem("cyPan"));
    const savedElements = JSON.parse(localStorage.getItem('cyElements')) || [];
    const initels = [
        // Nodes
        {
          data: {
            id: "1",
            label: "Da 1.107.1 x E 1.316.1 2.1325 (2.1)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "100px",
            height: "50px",
            fontSize: "8px",
            shape: "right-rhomboid",
            // shapeType: "trapezium",
          },
        },
        {
          data: {
            id: "2",
            label: "Da 1.107.2 x E 1.316.2 2.1325 (2.2)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "3",
            label: "Da 1.107.3 x E 1.316.3 2.1325 (2.3)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "4",
            label: "Da 1.107.4 x E 1.316.4 2.1325 (2.4)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "5",
            label: "Da 1.107.5 x E 1.316.5 2.1325 (2.5)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "6",
            label: "Da 1.107.6 x E 1.316.6 2.1325 (2.6)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "7",
            label: "Da 1.107.7 x E 1.316.7 2.1325 (2.7)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "8",
            label: "Da 1.107.8 x E 1.316.8 2.1325 (2.8)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "9",
            label: "Da 1.107.9 x E 1.316.9 2.1325 (2.9)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "10",
            label: "Da 1.107.10 x E 1.316.10 2.1325 (2.10)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "11",
            label: "Da 1.107.11 x E 1.316.11 2.1325 (2.11)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "12",
            label: "Da 1.107.12 x E 1.316.12 2.1325 (2.12)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "13",
            label: "Da 1.107.13 x E 1.316.13 2.1325 (2.13)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "14",
            label: "Da 1.107.14 x E 1.316.14 2.1325 (2.14)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "15",
            label: "Da 1.107.15 x E 1.316.15 2.1325 (2.15)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },

        {
          data: {
            id: "16",
            label: "PT02_002KSG03",
            stroke: "#CC476A",
            fill: "#FFD0DA",
            width: "45px",
            height: "45px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "17",
            label: "DD1_01KSG96",
            stroke: "#CC476A",
            fill: "#FFD0DA",
            width: "45px",
            height: "45px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "18",
            label: "DD2_02KSG97",
            stroke: "#CC476A",
            fill: "#FFD0DA",
            width: "45px",
            height: "45px",
            fontSize: "8px",
          },
        },

        {
          data: {
            id: "19",
            label: "15",
            stroke: "#7a52cc",
            fill: "#e0d1ff",
            width: "30px",
            height: "30px",
            fontSize: "12px",
          },
        },
        {
          data: {
            id: "20",
            label: "40",
            stroke: "#7a52cc",
            fill: "#e0d1ff",
            width: "30px",
            height: "30px",
            fontSize: "12px",
          },
        },
        {
          data: {
            id: "21",
            label: "70",
            stroke: "#7a52cc",
            fill: "#e0d1ff",
            width: "30px",
            height: "30px",
            fontSize: "12px",
          },
        },

        {
          data: {
            id: "22",
            label: "Da 1.107.22 x E 1.316.22 2.1325 (2.22)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "23",
            label: "Da 1.107.23 x E 1.316.23 2.1325 (2.23)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "24",
            label: "Da 1.107.24 x E 1.316.24 2.1325 (2.24)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "25",
            label: "Da 1.107.25 x E 1.316.25 2.1325 (2.25)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "26",
            label: "Da 1.107.26 x E 1.316.26 2.1325 (2.26)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "27",
            label: "Da 1.107.26 x E 1.316.26 2.1325 (2.26)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "28",
            label: "Da 1.107.26 x E 1.316.26 2.1325 (2.26)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "29",
            label: "Da 1.107.26 x E 1.316.26 2.1325 (2.26)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "30",
            label: "Da 1.107.26 x E 1.316.26 2.1325 (2.26)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },
        {
          data: {
            id: "31",
            label: "Da 1.107.26 x E 1.316.26 2.1325 (2.26)",
            stroke: "#D97706",
            fill: "#fef3c7",
            width: "50px",
            height: "50px",
            fontSize: "8px",
          },
        },

        // Edges
        { data: { id: "16-1", source: "16", target: "1" } },
        { data: { id: "1-19", source: "1", target: "19" } },
        { data: { id: "1-20", source: "1", target: "20" } },
        { data: { id: "1-21", source: "1", target: "21" } },

        { data: { id: "17-2", source: "17", target: "2" } },
        { data: { id: "18-2", source: "18", target: "2" } },
      ];

    const cy = cytoscape({
      container: cyRef.current,
      elements: savedElements.length ? savedElements : initels,
      style: [
        {
          selector: "node",
          style: {
            "background-color": "data(fill)",
            label: (node) => {
              return node.data("label").split("_").join(" ");
            },
            color: "#666",
            "border-width": "1px",
            "border-color": "data(stroke)",
            "text-valign": "center",
            "text-halign": "center",
            "font-size": "data(fontSize)",
            "text-wrap": "wrap",
            "text-max-width": "30px",
            width: "data(width)",
            height: "data(height)",
            "padding-bottom": "5px",
            "padding-top": "5px",
            "padding-left": "5px",
            "padding-right": "5px",
            shape: (node) => {
              return node.data("shape") ?? "ellipse";
            },
          },
        },
        {
          selector: "node:selected",
          style: {
            "border-width": "5px", // Border width ketika node dipilih
            // "border-color": "#FF0000", // Warna border ketika node dipilih (opsional)
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
          },
        },
      ],
      layout: savedElements.length
        ? { name: "preset" }
        : {
            name: "dagre",
            rankSep: 80, // Jarak antara peringkat (levels of nodes)
            nodeSep: 50, // Jarak antara node dalam peringkat yang sama
            fit: false,
            padding: 30,
            nodeDimensionsIncludeLabels: true,
          },
    });

    // Event listener untuk perubahan seleksi
    cy.on("select", "node", (event) => {
      var target = event.target || event.cyTarget;
      console.log("Node selected: " + target.id());
      setSelectedNodeIds((prevSelected) => [...prevSelected, target.id()]);
      saveElementsToLocalStorage(cy);
    });

    cy.on("unselect", "node", (event) => {
      var target = event.target || event.cyTarget;
      console.log("Node unselected: " + target.id());
      setSelectedNodeIds((prevSelected) =>
        prevSelected.filter((id) => id !== target.id())
      );
      saveElementsToLocalStorage(cy);
    });


    const saveElementsToLocalStorage = (cy) => {
        const elements = cy.elements().jsons();
        localStorage.setItem('cyElements', JSON.stringify(elements));
    };

    
    // Terapkan zoom dan pan setelah inisialisasi Cytoscape
    cy.ready(() => {
        saveElementsToLocalStorage(cy);
        cy.zoom(savedZoom);
        cy.pan(savedPan);
    });

    // Event listeners untuk menyimpan zoom dan pan ke localStorage
    cy.on('zoom', () => {
        localStorage.setItem('cyZoom', cy.zoom());
    });

    cy.on('pan', () => {
        saveElementsToLocalStorage(cy);
        localStorage.setItem('cyPan', JSON.stringify(cy.pan()));
    });

    // Event listener untuk menyimpan posisi node saat posisi berubah
    cy.on('position', 'node', (event) => {
        const tes = cy.nodes().filter((node) => node.data("id")==event.target.id());
        console.log("Node position: " , event.target.id(),tes[0].position());
        saveElementsToLocalStorage(cy);
    });

    // Fungsi untuk menambahkan node baru di atas atau di bawah node yang ada
    const addNodes = (targetId, direction) => {
      const existingNodes = cy.nodes().map((node) => node.data("id"));
      const newNodes = [];

      for (let i = 1; i <= 30; i++) {
        const newId = `${targetId}-${direction}-${i}`;
        if (!existingNodes.includes(newId)) {
          newNodes.push({
            data: {
              id: newId,
              label: `Node ${newId}`,
              stroke: "#FF0000",
              fill: "#FFD700",
              width: "30px",
              height: "30px",
              fontSize: "10px",
            },
          });
          newNodes.push({
            group: "edges",
            data: {
              id: `edge-${targetId}-${newId}`,
              source: direction === "up" ? newId : targetId,
              target: direction === "up" ? targetId : newId,
            },
          });
        }
      }

      cy.add(newNodes);
      saveElementsToLocalStorage(cy);
      cy.layout({
        name: "dagre",
        rankSep: 80,
        nodeSep: 50,
        fit: false,
        padding: 30,
        nodeDimensionsIncludeLabels: true,
      }).run();
    };

    // Setup context menus
    cy.contextMenus({
      menuItems: [
        {
          id: "show-relationship",
          content: "Show Relationship",
          selector: "node",
          hasTrailingDivider: true,
          submenu: [
            {
              id: "drill-up",
              content: "Drill Up",
              selector: "node",
              hasTrailingDivider: true,
              onClickFunction: function (event) {
                var target = event.target || event.cyTarget;
                console.log("Drill Up on " + target.id());
                addNodes(target.id(), "up");
              },
            },
            {
              id: "drill-down",
              content: "Drill Down",
              selector: "node",
              onClickFunction: function (event) {
                var target = event.target || event.cyTarget;
                console.log("Drill Down on " + target.id());
                addNodes(target.id(), "down");
              },
            },
          ],
        },
        {
          id: "show-performance",
          content: "Show Performance",
          selector: "node",
          hasTrailingDivider: true,
          submenu: [
            {
              id: "census",
              content: "Census",
              selector: "node",
              hasTrailingDivider: true,
              onClickFunction: function (event) {
                var target = event.target || event.cyTarget;
                console.log("Census on " + target.id());
              },
            },
            {
              id: "yield",
              content: "Yield",
              selector: "node",
              onClickFunction: function (event) {
                var target = event.target || event.cyTarget;
                console.log("Yield on " + target.id());
              },
            },
          ],
        },
        {
          id: "collapse-node",
          content: "Collapse Node",
          selector: "node",
          onClickFunction: function (event) {
            var target = event.target || event.cyTarget;
            console.log("Collapse Node on " + target.id());
          },
        },
      ],
    });

    // Cleanup function to remove the instance when component unmounts
    return () => {
      cy.destroy();
    };
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      cyRef.current.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <>
      <button onClick={handleFullscreen}>Toggle Fullscreen</button>
      <strong>{JSON.stringify(selectedNodeIds)}</strong>
      <div
        ref={cyRef}
        style={{ width: "100%", height: "600px", backgroundColor: "#fff" }}
      />
    </>
  );
};

export default Graph;
