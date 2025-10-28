import cv2

# Bild laden
img = cv2.imread("GptEditedv1.png")

# Callback-Funktion für Mausereignisse
def mouse_position(event, x, y, flags, param):
    if event == cv2.EVENT_MOUSEMOVE:
        # Kopie des Bildes (damit keine Spuren bleiben)
        temp = img.copy()
        # Text mit Koordinaten anzeigen
        cv2.putText(temp, f"X:{x} Y:{y}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow("Bild", temp)
    elif event == cv2.EVENT_LBUTTONDOWN:
        print(f"Linksklick bei: X={x}, Y={y}")

# Fenster erstellen & Callback registrieren
cv2.imshow("Bild", img)
cv2.setMouseCallback("Bild", mouse_position)

cv2.waitKey(0)
cv2.destroyAllWindows()
