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
  const [cy, setCy] = useState(cytoscape());
  const [selectedNodeIds, setSelectedNodeIds] = useState([]);

  const hiddenNodesRef = useRef(new Set());

  const collapseNode = (node) => {
    console.log("node.data => ", node.data, node.data("level"));
    if (node.data("level") > 1) {
      const parentNodes = node.predecessors().filter((ele) => ele.isNode());
      parentNodes.forEach((parentNode) => {
        hiddenNodesRef.current.add(parentNode.id());
        parentNode.hide();
      });
    } else {
      node
        .connectedEdges()
        .targets()
        .forEach((connectedNode) => {
          hiddenNodesRef.current.add(connectedNode.id());
          connectedNode.hide();
        });
    }
  };

  const expandNode = (node) => {
    node
      .connectedEdges()
      .targets()
      .forEach((connectedNode) => {
        if (hiddenNodesRef.current.has(connectedNode.id())) {
          hiddenNodesRef.current.delete(connectedNode.id());
          connectedNode.show();
        }
      });
  };

  useEffect(() => {
    const savedZoom = parseFloat(localStorage.getItem("cyZoom"));
    const savedPan = JSON.parse(localStorage.getItem("cyPan"));
    const savedElements = JSON.parse(localStorage.getItem("cyElements")) || [];
    const savedPositions = JSON.parse(localStorage.getItem("cyPositions") || "{}");
    const initels = [
      // Nodes
      {
        data: {
          id: "level-1.1",
          label: "Da 1.107.15 x E 1.316.15 2.1325 (2.15)",
          level: "1",
          stroke: "#D97706",
          fill: "#fef3c7",
          width: "50px",
          height: "50px",
          fontSize: "8px",
        },
      },

      {
        data: {
          id: "level-2.1",
          label: "PT02_002KSG03",
          level: "2",
          stroke: "#CC476A",
          fill: "#FFD0DA",
          width: "45px",
          height: "45px",
          fontSize: "8px",
        },
      },
      {
        data: {
          id: "level-3.1",
          label: "Da 1.107.24 x E 1.316.24 2.1325 (2.24)",
          level: "3",
          stroke: "#D97706",
          fill: "#fef3c7",
          width: "50px",
          height: "50px",
          fontSize: "8px",
        },
      },
      {
        data: {
          id: "level-3.2",
          label: "Da 1.107.25 x E 1.316.25 2.1325 (2.25)",
          level: "3",
          stroke: "#D97706",
          fill: "#fef3c7",
          width: "50px",
          height: "50px",
          fontSize: "8px",
        },
      },
      {
        data: {
          id: "level-3.3",
          label: "Da 1.107.26 x E 1.316.26 2.1326 (2.26)",
          level: "3",
          stroke: "#D97706",
          fill: "#fef3c7",
          width: "50px",
          height: "50px",
          fontSize: "8px",
        },
      },
      {
        data: {
          id: "level-4.1",
          label: "Da 1.107.22",
          level: "4",
          stroke: "#007E46",
          fill: "#B3E2CD",
          width: "40px",
          height: "40px",
          fontSize: "8px",
          shape: "right-rhomboid",
        },
      },
      {
        data: {
          id: "level-4.2",
          label: "Da 1.107.23",
          level: "4",
          stroke: "#007E46",
          fill: "#B3E2CD",
          width: "40px",
          height: "40px",
          fontSize: "8px",
          shape: "round-triangle",
        },
      },
      {
        data: {
          id: "level-4.3",
          label: "Da 1.107.24",
          level: "4",
          stroke: "#007E46",
          fill: "#B3E2CD",
          width: "40px",
          height: "40px",
          fontSize: "8px",
          shape: "round-rectangle",
        },
      },
      {
        data: {
          id: "level-4.4",
          label: "Da 1.107.5",
          level: "4",
          stroke: "#007E46",
          fill: "#B3E2CD",
          width: "40px",
          height: "40px",
          fontSize: "8px",
        },
      },
      {
        data: {
          id: "level-5.1",
          label: "15",
          level: "5",
          stroke: "#7a52cc",
          fill: "#e0d1ff",
          width: "30px",
          height: "30px",
          fontSize: "12px",
        },
      },
      {
        data: {
          id: "level-6.1",
          label: "Da 1.107.6 x E 1.316.6 2.666 (2.60)",
          level: "6",
          stroke: "#D97706",
          fill: "#fef3c7",
          width: "50px",
          height: "50px",
          fontSize: "8px",
        },
      },
      {
        data: {
          id: "level-7.1",
          label: "DD2_02KSG97",
          level: "7",
          stroke: "#CC476A",
          fill: "#FFD0DA",
          width: "45px",
          height: "45px",
          fontSize: "8px",
        },
      },

      // Edges
      { data: { id: "rel-level-1.1", source: "level-2.1", target: "level-1.1" } },

      { data: { id: "rel-level-2.1", source: "level-2.1", target: "level-3.1" } },
      { data: { id: "rel-level-2.2", source: "level-2.1", target: "level-3.2" } },
      { data: { id: "rel-level-2.3", source: "level-2.1", target: "level-3.3" } },

      { data: { id: "rel-level-4.1", source: "level-4.1", target: "level-2.1" } },
      { data: { id: "rel-level-4.2", source: "level-4.2", target: "level-2.1" } },
      { data: { id: "rel-level-4.3", source: "level-4.3", target: "level-2.1" } },
      { data: { id: "rel-level-4.4", source: "level-4.4", target: "level-2.1" } },

      { data: { id: "rel-level-5.1", source: "level-5.1", target: "level-4.4" } },
      { data: { id: "rel-level-6.1", source: "level-6.1", target: "level-5.1" } },
      { data: { id: "rel-level-7.1", source: "level-7.1", target: "level-6.1" } },
    ];

    const cyInstance = cytoscape({
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
            "text-max-width": "30px",
            "text-wrap": "wrap",
            width: (node) => {
              let addw = 0;
              switch (node.data("shape")) {
                case "right-rhomboid":
                  addw = 30;
                  break;
                case "round-triangle":
                  addw = 30;
                  break;
                case "round-rectangle":
                  break;

                default:
                  break;
              }
              return parseInt(node.data("width")) + addw + "px";
            },
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
        ? {
            name: "preset",
            positions: (node) => savedPositions[node.id()] || node.position(),
          }
        : {
            name: "dagre",
            rankSep: 100,
            nodeSep: 50,
            fit: false,
            padding: 30,
            nodeDimensionsIncludeLabels: true,
          },
    });

    setCy(cyInstance);

    // Event listener untuk perubahan seleksi
    cyInstance.on("select", "node", (event) => {
      var target = event.target || event.cyTarget;
      console.log("Node selected: " + target.id(),target.data('level'));
      setSelectedNodeIds((prevSelected) => [...prevSelected, target.id()]);
      saveElementsToLocalStorage();
    });

    cyInstance.on("unselect", "node", (event) => {
      var target = event.target || event.cyTarget;
      console.log("Node unselected: " + target.id());
      setSelectedNodeIds((prevSelected) =>
        prevSelected.filter((id) => id !== target.id())
      );
      saveElementsToLocalStorage();
    });

    const saveElementsToLocalStorage = () => {
      const elements = cyInstance.elements().jsons();
      localStorage.setItem("cyElements", JSON.stringify(elements));
    };

    const savePositionsToLocalStorage = () => {
      const positions = {};
      cyInstance.nodes().forEach((node) => {
        positions[node.id()] = node.position();
      });
      localStorage.setItem("cyPositions", JSON.stringify(positions));
    };

    // Apply zoom and pan after Cytoscape initialization
    cyInstance.ready(() => {
      cyInstance.zoom(savedZoom);
      cyInstance.pan(savedPan);
      saveElementsToLocalStorage();
      savePositionsToLocalStorage();
    });

    // Event listeners untuk menyimpan zoom dan pan ke localStorage
    cyInstance.on("zoom", () => {
      localStorage.setItem("cyZoom", cyInstance.zoom());
    });

    cyInstance.on("pan", () => {
      saveElementsToLocalStorage();
      localStorage.setItem("cyPan", JSON.stringify(cyInstance.pan()));
    });

    // Event listener untuk menyimpan posisi node saat posisi berubah
    cyInstance.on("position", "node", () => {
      savePositionsToLocalStorage();
    });

    // Fungsi untuk menambahkan node baru di atas atau di bawah node yang ada
    const addNodes = (targetNode, direction) => {
      const existingNodes = cyInstance.nodes().map((node) => node.data("id"));
      const newNodes = [];
      const level = parseInt(targetNode.data("level"));
      for (let i = 1; i <= 3; i++) {
        const newId = `${targetNode.id()}-${direction}-${i}`;
        if (!existingNodes.includes(newId)) {
          newNodes.push({
            data: {
              id: newId,
              label: `Node ${newId}`,
              level: `${direction === "down" && level <= 1 ? level - 1 : level + 1}`,
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
              id: `edge-${targetNode.id()}-${newId}`,
              source: direction === "up" ? newId : targetNode.id(),
              target: direction === "up" ? targetNode.id() : newId,
            },
          });
        }
      }

      cyInstance.add(newNodes);
      cyInstance
        .layout({
          name: "dagre",
          rankSep: 100,
          nodeSep: 50,
          fit: false,
          padding: 30,
          nodeDimensionsIncludeLabels: true,
        })
        .run();
      saveElementsToLocalStorage();
      savePositionsToLocalStorage();
    };

    // Setup context menus
    cyInstance.contextMenus({
      submenuIndicator: {
        src: "./right-arrow-svgrepo-com.svg",
        width: 12,
        height: 12,
      },
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
                addNodes(target, "up");
              },
            },
            {
              id: "drill-down",
              content: "Drill Down",
              selector: "node",
              onClickFunction: function (event) {
                var target = event.target || event.cyTarget;
                console.log("Drill Down on " + target.id());
                addNodes(target, "down");
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
            const target = event.target || event.cyTarget;
            if (hiddenNodesRef.current.has(target.id())) {
              expandNode(target);
            } else {
              collapseNode(target);
            }
          },
        },
        {
          id: "expand-node",
          content: "Expand Node",
          selector: "node",
          onClickFunction: function (event) {
            var target = event.target || event.cyTarget;
            console.log("Expand Node on " + target.id());
            expandNode(target);
          },
        },
      ],
    });

    // Cleanup function to remove the instance when component unmounts
    return () => {
      cyInstance.destroy();
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
  const goToNode = (nodeId) => {
    if (cy) {
      const node = cy.getElementById(nodeId);
      if (node) {
        cy.fit(node, 250); // Adjust the second parameter for padding around the node
        node.select();
        console.log("node", node);
      }
    }
  };

  return (
    <>
      <button onClick={handleFullscreen}>Toggle Fullscreen</button>
      <button onClick={() => goToNode("1")}>Go to Node 1</button>
      <strong>{JSON.stringify(selectedNodeIds)}</strong>
      <div
        ref={cyRef}
        style={{ width: "100%", height: "600px", backgroundColor: "#fff" }}
      />
    </>
  );
};

export default Graph;
