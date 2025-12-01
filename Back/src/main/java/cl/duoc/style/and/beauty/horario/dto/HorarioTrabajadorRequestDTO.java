package cl.duoc.style.and.beauty.horario.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HorarioTrabajadorRequestDTO {
    private Long idTrabajador;
    private String diaSemana;
    private Integer horaInicioMin;
    private Integer horaFinMin;
}
