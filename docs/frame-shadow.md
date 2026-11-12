# Schatten der Handkarten

Der normale Rahmenatlas enthält einen dunklen rechteckigen Hintergrund außerhalb der Ornamente. Die bisherige Luminanz-Transparenz ließ diese dunklen Pixel teilweise sichtbar, wodurch oberhalb der eigentlichen Rahmenkontur ein Rechteck/Schatten blieb. Der SVG-Filter blendet nun den dunklen Hintergrund aus, bevor die Kontur berechnet wird. Helle Metallflächen bleiben sichtbar; die Bilddateien selbst werden nicht verändert.

Zusätzlich sind rechteckige Schatten, Hintergründe und Pseudoelemente des äußeren Handkarten-Buttons für Normal-, Hover-, Fokus-, Aktiv- und deaktivierten Zustand ausdrücklich abgeschaltet. Die sichtbare Kontur folgt weiterhin dem eigentlichen SVG-Rahmen; pulsierende Energiekosten bleiben erhalten.

39 gezielte Prüfungen bestanden, darunter Frame-Transparenz, alle Interaktionszustände, Kartenansichten, Kartenlesbarkeit, Kampflayout und Asset-Integrität. Alle 1.299 Assets bytegleich erhalten. Statische SVG-Vorschau aller vier normalen Rahmen geprüft; keine echte Handy-Browserprüfung durchgeführt.
