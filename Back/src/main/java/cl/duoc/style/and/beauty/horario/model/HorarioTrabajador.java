package cl.duoc.style.and.beauty.horario.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "HORARIO_TRABAJADOR")
@Getter
@Setter
public class HorarioTrabajador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_HORARIO")
    private Long id;

    @Column(name = "ID_TRABAJADOR", nullable = false)
    private Long idTrabajador;

    @Column(name = "DIA_SEMANA", nullable = false)
    private String diaSemana;

    @Column(name = "HORA_INICIO_MIN", nullable = false)
    private Integer horaInicioMin;

    @Column(name = "HORA_FIN_MIN", nullable = false)
    private Integer horaFinMin;
}
