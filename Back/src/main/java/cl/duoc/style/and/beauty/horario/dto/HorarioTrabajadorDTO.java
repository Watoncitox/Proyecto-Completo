package cl.duoc.style.and.beauty.horario.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HorarioTrabajadorDTO {
    private Long id;
    private Long idTrabajador;
    private String diaSemana;
    private Integer horaInicioMin;
    private Integer horaFinMin;
}
